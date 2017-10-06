const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const bcrypt = require('bcrypt');

const UserSchema = new Schema({
  name: {
    type: String,
    required: [true, 'Your name is required']
  },
  email: {
    type: String,
    required: [true, 'Email is required']
  },
  password: {
    type: String,
    required: [true, 'Password is required']
  },
  description: {
    type: String,
  },
  profilePhoto: {
    type: String
  },
  colorTheme: {
    type: String
  }
});

UserSchema.methods.generateHash = function(password) {
  return bcrypt.hashSync(password, bcrypt.genSaltSync(8), null);
};

UserSchema.methods.validPassword = function(password) {
  return bcrypt.compareSync(password, this.password);
};

UserSchema.methods.asData = function() {
  return {
    id: this._id,
    name: this.name,
    email: this.email,
    description: this.description,
    profilePhoto: this.profilePhoto,
    colorTheme: this.colorTheme
  }
};


const User = mongoose.model('User', UserSchema);

module.exports = {
  User
};
