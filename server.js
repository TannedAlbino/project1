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


app.set("view engine", "ejs");
app.use("/static", express.static('public'));
app.use(bodyParser.urlencoded({ extended: true }));
console.log("variables loaded");
 mongoose.connect("mongodb://localhost/project1");
//middleware

app.use(express.static('public'));
app.set('view engine', 'ejs');
app.use(bodyParser.urlencoded({extended: true}));
// mongoose.connect('mongodb://localhost/project1');
app.get('/', function (req, res) {
  res.render('index', {});
});

//login route (renders signup view)
app.get('/signup', function (req, res) {
	res.render('signup');
});

app.get('/users', function(req, res) {
	console.log("sending all user data");
	User.find({}, function(err, allUsers) {
		res.json(allUsers);
	});
});

app.post("/users/", function(req, res) {
	console.log(req.body);
	res.json(user);
});

app.post('/users', function (req, res) {
	User.createSecure(req.body.email, req.body.password, function (err, user) {
		res.json(user);
	});
});








app.listen(process.env.PORT ||3000)
console.log("express heroku starter is running on port 3000");