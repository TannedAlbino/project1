//server.js
console.log("Server js is connected!!");
var express = require("express");
var bodyParser = require('body-parser');
var app = express();
var mongoose = require("mongoose");
 // var db = require("./models");
var where = require("./utils/where.js");
var path = require("path");
 // mongoose.connect("mongodb://localhost/project1_app");
app.set("view engine", "ejs");
app.use("/static", express.static('public'));
app.use(bodyParser.urlencoded({ extended: true }));
console.log("variables loaded");

//middleware

app.use(express.static('public'));
app.set('view engine', 'ejs');
app.use(bodyParser.urlencoded({extended: true}));
// mongoose.connect('mongodb://localhost/project1');
app.get('/', function (req, res) {
  res.render('index', {});
});









app.listen(process.env.PORT ||3000)
console.log("express heroku starter is running on port 3000");