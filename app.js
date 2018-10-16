const dotenv = require('dotenv')
const express = require('express');
const path = require('path');
const logger = require('morgan');
const cookieParser = require('cookie-parser');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const cors = require('cors');
const session = require('express-session');
const MongoStore = require('connect-mongo')(session);
const passport = require('passport');
const multer = require('multer');

const response = require('./helpers/response');
const configure = require('./config/passport');

const auth = require('./routes/auth');
const posts = require('./routes/post');
const blog = require('./routes/blog');


require("dotenv").config();


mongoose.connect(process.env.MONGO_DB_URL), {
  useMongoClient: true
};

const app = express();


app.use(session({
  secret: 'minimo-app',
  resave: true,
  saveUninitialized: true,
  store: new MongoStore({
    mongooseConnection: mongoose.connection
  })
}));

const corsOptions = {
  origin: process.env.FRONT_END_URL,
  credentials: true,
  allowedHeaders: ['Content-Type'],
  methods: ['GET', 'POST', 'PUT', 'DELETE'],
};

app.use(cors(corsOptions));


configure(passport);

app.use(passport.initialize());
app.use(passport.session());

app.use(logger('dev'));
app.use(bodyParser.json());
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/auth', auth);
app.use('/posts', posts);
app.use('/blog', blog);

// catch 404 and forward to error handlerapp.use('/task', task);

app.use(function(req, res, next) {
  response.notFound(req, res);
});

// error handler
app.use(function(err, req, res, next) {
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  if (!res.headersSent) {
    response.unexpectedError(req, res, err);
  }
});

module.exports = app;
