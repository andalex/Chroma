const mongoose = require('mongoose');
const db = require('./db');
const bcrypt = require('bcryptjs');

var userSchema = new mongoose.Schema({
    twitter: String,
    displayName: String,
    email: String,
    password: {type: String, select: false}
});

userSchema.pre('save', function(next) {
  var user = this;

  /**
   * isModified returns true if password has been modified
   * Check to make sure it hasn't, call next
   */
  if (!user.isModified('password')) {
    return next();
  }

  /**
   * genSalt default of rounds = 10
   */
  bcrypt.genSalt(function(err, salt) {
    bcrypt.hash(user.password, salt, function(err, hash) {
      user.password = hash;
      next();
    });
  });
});

  /**
  * create a method here to be used in user-route.js
  */
userSchema.methods.checkPassword = function(password, done) {
  bcrypt.compare(password, this.password, function(err, match) {
    done(err, match);
  });
};

module.exports = mongoose.model('User', userSchema);;
