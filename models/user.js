// user.js

// require dependencies
var mongoose = require('mongoose'),
  Schema = mongoose.Schema,
  bcrypt = require('bcrypt'),
  salt = bcrypt.genSaltSync(10);

  // define user schema
var userSchema = new Schema({
  email: String,
  passwordDigest: String
});

// create a new user with secure (hashed) password
userSchema.statics.createSecure = function (email, password, callback) {
  // `this` references our schema
  // store it in variable `user` because `this` changes context in nested callbacks
console.log("this inside createSecure: ", this);
  var user = this;

  // hash password user enters at sign up
  bcrypt.genSalt(function (err, salt) {
    bcrypt.hash(password, salt, function (err, hash) {
      console.log(hash);

      // create the new user (save to db) with hashed password
      user.create({
        email: email,
        passwordDigest: hash
      }, callback);
    });
  });
};

// authenticate user (when user logs in)
userSchema.statics.authenticate = function (email, password, callback) {
  // find user by email entered at log in
  this.findOne({email: email}, function (err, user) {
    console.log(user);

    // throw error if can't find user
    if (!user) {
      console.log('No user with email ' + email);

    // if found user, check if password is correct
    } else if (user.checkPassword(password)) {
      callback(null, user);
    }
  });
};

// compare password user enters with hashed password (`passwordDigest`)
userSchema.methods.checkPassword = function (password) {
  // run hashing algorithm (with salt) on password user enters in order to compare with `passwordDigest`
  return bcrypt.compareSync(password, this.passwordDigest);
};

// define user model
var User = mongoose.model('User', UserSchema);

// export user model so it's available to server
module.exports = User;