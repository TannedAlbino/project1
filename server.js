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
var cookieParser = require('cookie-parser');
require('dotenv').load();
// 
// 	
//app dependencies
app.set("view engine", "ejs");
app.use("/static", express.static('public'));
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cookieParser());
// console.log("variables loaded");
 // mongoose.connect("mongodb://localhost/project1");
//middleware


//set session options
app.use(session({
  key: 'connect.sid',
  saveUninitialized: true,
  resave: true,
  secret: 'SecretKey',
  cookie: { maxAge: 60 * 60 * 1000 }
}));

app.get('/', function (req, res) {

  res.render('index', {});
});

//login route (renders signup view)
app.get('/signup', function (req, res) {
	res.render('signup');
});

app.get('/home', function (req, res) {
	User.find({_id:req.session.userId}, function(err, user) {
		
	res.render('home', {user:user});
	});
});
app.get('/humanity', function (req, res) {
	res.render('humanity');
});
app.get('/motivated', function (req, res) {
	res.render('motivated');
});
app.get('/pretty', function (req, res) {
	res.render('pretty');
});
app.get('/smart', function (req, res) {
	res.render('smart');
});
app.get('/funny', function (req, res) {
	res.render('funny');
});
app.get('/login', function (req, res) {
	console.log("req.cookies:\n ", req.cookies, "\nreq.session:\n", req.session);
	var formCookie = req.cookies;
	var formSession= req.session;

	res.render('login', {
		cookie: formCookie,
		session: formSession
	});
});

app.get('/user', function(req, res) {
	console.log("sending all user data");
	User.find({}, function(err, allUsers) {
		res.json(allUsers);
	});
});

app.post('/session', function (req, res) {
	console.log("this is in a session", req.body);
  // call authenticate function to check if password user entered is correct
  User.authenticate(req.body.email, req.body.password, function (err, loggedInUser) {
    if (err) {
    	console.log('authentication error: ', err);
    	res.status(500).send();
    } else {
    	console.log('setting session user id ', loggedInUser._id);
    	req.session.userId = loggedInUser._id;
    	// res.redirect('/home');
    	res.json(loggedInUser);
    }
    res.json(loggedInUser);
  });
});

// create a user route - new user with a secure password
app.post('/user', function (req, res) {
	console.log('request body: ', req.body);
	res.json("it worked!");
// });
//Sign up route - creates new user with a secure password
// app.post('/signup', function (req, res) {
	//use the email and password to authenticate
	// console.log(req.body);
	User.createSecure(req.body.email, req.body.password, function (err, newUser) {
		if (err) {
			console.log(err)
		}
		console.log('New User Created', newUser)
		// req.session.userId = newUser._id;
		console.log('newUserid: ', newUser._id)
		console.log('session userid: ', req.session.userId)
		res.redirect('/home');



			// res.json(user);
	});
//user submitting the login section
// app.post('/sessions', function (req, res) {
// 	//call authenticate function to check if password entered is correct
// 	User.authenticate(req.body.email, req.body.password, function (err, user) {
// 		res.json(user);

// 	});
// });






// app.post("/user", function(req, res) {
// 	console.log(req.body);
// 	res.json(user);
// });
// authenticate user and set session



app.post('/cookie-form', function (req, res){
	var email = req.body.email || "";
	var password = req.body.password || "";
	res.cookie("email", email);
	res.cookie('password', password);

	res.json({
		cookie: res.cookies,
		session: req.session
	})
})

app.post('/session-form', function(req, res) {
	console.log("Sessionnn", req.body)
	var sessionForm = req.body;
	console.log("session form data is: ", sessionForm);
	req.session.location = sessionForm.location || "";
	req.session.duratio = sessionForm.duration || "";
	res.json({
		cookies: res.cookies,
		session: req.session
	})
});

app.delete('/clear', function(req, res) {
	for (key in req.cookies) {
		res.clearCookie(key, { path: '/'});
	}
	console.log("Session Cookie Being Deleted", req.cookies[connect.sid]);
	res.clearCookie(key, { path: '/'});
	req.session = null;
	req.json("cookies and sessions deleted")
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
			res.render('/home', {user: currentUser});
		}
	});
});

app.get('/logout', function (req, res) {
	// remove the session user id
	req.session.userId = null;
	// redirect to login (make sure to change later if)
	res.redirect('/login');
});

});








app.listen(process.env.PORT ||3000)
console.log("express heroku starter is running on port 3000");