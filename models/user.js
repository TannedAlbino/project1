// user.js
console.log("user js is connected to server js and working")
// require dependencies
var mongoose = require('mongoose'),
  Schema = mongoose.Schema,
  bcrypt = require('bcrypt'),
  salt = bcrypt.genSaltSync(10);


mongoose.connect( process.env.MONGOLAB_URI ||
          process.env.MONGOHQ_URL ||
          "mongodb://localhost/project1_app")

  // define user schema
var userSchema = new Schema({
  email: {
    type: String,
    unique: true
  },
  passwordDigest: String
});

// create a new user with secure (hashed) password
userSchema.statics.createSecure = function (email, password, callback) {
  // `this` references our schema
  // store it in variable `user` because `this` changes context in nested callbacks

// console.log("this inside createSecure: ", this);
// this displayed correctly
  
  var UserModel = this;
  // hash password user enters at sign up
  bcrypt.genSalt(function (err, salt) {
    bcrypt.hash(password, salt, function (err, hash) {
      console.log(hash);

      // create the new user (save to db) with hashed password
      UserModel.create({
        email: email,
        passwordDigest: hash
      }, callback);
    });
  });
};

// authenticate user (when user logs in)
userSchema.statics.authenticate = function (email, password, callback) {
  // find user by email entered at log in
  this.findOne({email: email}, function (err, foundUser) {
    console.log(foundUser);

    // throw error if can't find user
    if (!foundUser) {
      console.log('No user with email ' + email);
      callback("Error: no user found", null);

    // if found user, check if password is correct
    } else if (foundUser.checkPassword(password)) {
      callback(null, foundUser);
    } else {
      callback("Error: incorrect password", null);
    }
  });
};

// compare password user enters with hashed password (`passwordDigest`)
userSchema.methods.checkPassword = function (password) {
  // run hashing algorithm (with salt) on password user enters in order to compare with `passwordDigest`
  return bcrypt.compareSync(password, this.passwordDigest);
};

// define user model
var User = mongoose.model('User', userSchema);

// export user model so it's available to server
module.exports = User;