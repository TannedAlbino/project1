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
// var flickr = require('flickrapi');
// 	flickrOptions = {
// 		api_key: "c9f9155910083a4768854ba5009200eb",
// 		secret: "ed414500ae65d5fa"


// 	};
// 	Flickr.authenticate(flickrOptios, function(error, flickr){
// 		//flickr is now our API object
// 	})
app.set("view engine", "ejs");

//double check if I need the "/static"
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
	console.log(req.body);
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
// app.post('/user', function (req, res) {
// 	console.log('request body: ', req.body);
// 	res.json("it worked!");
// });





// app.post("/user", function(req, res) {
// 	console.log(req.body);
// 	res.json(user);
// });
// authenticate user and set session
app.post('/session', function (req, res) {
	console.log(req);
  // call authenticate function to check if password user entered is correct
  User.authenticate(req.body.email, req.body.password, function (err, loggedInUser) {
    if (err) {
    	console.log('authentication error: ', err);
    	res.status(500).send();
    } else {
    	console.log('setting session user id ', loggedInUser._id);
    	req.session.userId = loggedInUser._id;
    	res.redirect('/profile');
    }
    res.json(user);
  });
});

//show user profile page
app.get('/profile', function (req, res) {
	console.log('session user id: ', req.session.userId);
	// find the user currently logged in
	User.findOne({_id: req.session.userId}, function (err, currentUser) {
		if (err) {
			console.log('database error: ', err);
			res.redirect('/login');
		} else {
			// render profile template with user's data
			console.log('loading profile of logged in user');
			res.render('user-show.ejs', {user: currentUser});
		}
	});
});

app.get('/logout', function (req, res) {
	// remove the session user id
	req.session.userId = null;
	// redirect to login (make sure to change later)
	res.redirect('/login');
});

});








app.listen(process.env.PORT ||3000)
console.log("express heroku starter is running on port 3000");