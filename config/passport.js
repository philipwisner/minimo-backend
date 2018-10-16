const LocalStrategy = require('passport-local').Strategy;
const bcrypt = require('bcrypt');
const passport = require('passport');
const GoogleStrategy = require('passport-google-oauth').OAuth2Strategy;
const User = require('../models/user').User;

module.exports = (passport) => {
  passport.serializeUser((user, done) => {
    done(null, user);
  });

  passport.deserializeUser((user, done) => {
    user = user ? new User(user) : null;
    done(null, user);
  });

  passport.use(new LocalStrategy({usernameField: 'email'},(email, password, next) => {
    User.findOne({
      email
    }, (err, user) => {
      if (err) {
        return next(err);
      }

      if (!user) {
        return next(null, false, {
          message: 'Incorrect email'
        });
      }

      if (!bcrypt.compareSync(password, user.password)) {
        return next(null, false, {
          message: 'Incorrect password'
        });
      }

      return next(null, user);
    });
  }));
  passport.use(new GoogleStrategy({
    clientID: process.env.CLIENT_ID,
    clientSecret: process.env.CLIENT_SECRET,
    callbackURL: process.env.CALLBACK
  }, (accessToken, refreshToken, profile, done) => {
    console.log('inside passport stragegy');
    User.findOne({
      googleId: profile.id
    }, (err, user) => {
      if (err) {
        return done(err);
      }
      if (user) {
        return done(null, user);
      }
      const newUser = new User({
        googleId: profile.id,
        name: profile.name.givenName + " " + profile.name.familyName,
        email: profile.emails[0].value,
      });
      newUser.save((err) => {
        if (err) {
          return done(err);
        }
        done(null, newUser);
      });
    });
  }));
}
