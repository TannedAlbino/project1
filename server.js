//server.js
console.log("Server js is connected!!");
var express = require("express");
var bodyParser = require('body-parser');
var app = express();
var mongoose = require("mongoose");
 // var db = require("./models");
var where = require("./utils/where.js");
var path = require("path");
var User = require('./models/user.js');
var session = require('express-session');

app.set("view engine", "ejs");
app.use("/static", express.static('public'));
app.use(bodyParser.urlencoded({ extended: true }));
console.log("variables loaded");
 // mongoose.connect("mongodb://localhost/project1");
//middleware

app.use(express.static('public'));
app.set('view engine', 'ejs');
app.use(bodyParser.urlencoded({extended: true}));
//set session options
app.use(session({
  saveUninitialized: true,
  resave: true,
  secret: 'SuperSecretCookie',
  cookie: { maxAge: 60 * 30 * 1000 }
}));

app.get('/', function (req, res) {

  res.render('index', {});
});

//login route (renders signup view)
app.get('/signup', function (req, res) {
	res.render('signup');
});

app.get('/user', function(req, res) {
	console.log("sending all user data");
	User.find({}, function(err, allUsers) {
		res.json(allUsers);
	});
});

//Sign up route - creates new user with a secure password
app.post('/user', function (req, res) {
	//use the email and password to authenticate
	User.createSecure(req.body.email, req.body.password, function (err, user) {
		res.json(user);
	});
//user submitting the login section
app.post('/server', function (req, res) {
	//call authenticate function to check if password entered is correct
	User.authenticate(req.body.email, req.body.password, function (err, user) {
		res.json(user);

	});
});
//create a user route - new user with a secure password
app.post('/user', function (req, res) {
	console.log('request body: ', req.body);
	res.json("it worked!");
});





// app.post("/users", function(req, res) {
// 	console.log(req.body);
// 	res.json(user);
// });
// user submits the login form
// app.post('/login', function (req, res) {
  // call authenticate function to check if password user entered is correct
  // User.authenticate(req.body.email, req.body.password, function (err, user) {
    // res.json(user);
  // });
// });


});








app.listen(process.env.PORT ||3000)
console.log("express heroku starter is running on port 3000");