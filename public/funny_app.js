$(document).ready(function() {
	console.log("testing to make sure of connectivity to public app js");
	// require('dotenv').load();
	// var dotenv = require('dotenv');
	
	// var INSTAGRAM_API_KEY = process.env.INSTAGRAM_API_KEY;
	app = new App();
	app.getFunny();
	app.getFunnyPic();
	// app.addEventListener();
	app.getFails;
	app.getMotivation;
});

// var $signupForm = $('#signup-form');
// 		$signupForm.on('submit', function(e){
// 			e.preventDefault();
// var user = $("#signup-form").serialize();
// 	$.post('/users', user, function(data){
// 		console.log(data);
// 			});
// 	});

function App(){};

App.prototype.getFunny = function(){
	var url = "https://api.giphy.com/v1/gifs/search?limit=10&q=fail&api_key=dc6zaTOxFJmzC"
	var that = this
	$.ajax({
		// this is a GET request. all ajax calls are GET by default, so this next line isn't 
		// necessary in this case.
	
 
		type: 'GET',
		// the URL where we are getting our data
		url: url,
		success: function(object, status){
			that.parseObject(object)
		},
	    error: function(object, status){
	        console.log("There was an error!");
	    }
	});
};


App.prototype.getFunnyPic = function(){
	var url = "https://api.instagram.com/v1/tags/toofunny/media/recent?client_id=e8e933f52cdb49cca32336215450ee2f&count=8"
	var that = this
    //add second url called urlImage and make it 
	$.ajax({
		
		// ajax calls are GET by default, so this next line isn't 
		// necessary in this case. 
			// flickr.photos.search({
  // 		text: "red+panda"
		// }, function(err, result) {
  // 		if(err) { throw new Error(err); }
  // do something with result
		type: 'GET',
		dataType: "jsonp",
		// the URL where we are getting our data
		url: url,
		success: function(object, status){
			that.parseObject2(object)
		},
	    error: function(object, status){
	        console.log("There was an error!");
	    }
	});
};

//parse for the gifs
App.prototype.parseObject = function(object){
	$('#gifs').empty();
	var gifs = object.data;
	var that = this;
	gifs.forEach(function(gifObject){
		that.renderGif(gifObject.images.fixed_height.url)
	});
};

//parse for the images
App.prototype.parseObject2 = function(object){
	$('#images').empty();
	var images = object.data;
	var that = this;
	images.forEach(function(imagesObject) {
		that.renderImages(imagesObject.images.standard_resolution.url)
	});
}
//can simply add a height and width in this image source
App.prototype.renderGif = function(imgUrl){
	var img = '<div class="thumbnail"><img src=' + imgUrl + ' width=300px ><br>'
	$('#gifs').append(img)
}
//for images
App.prototype.renderImages = function (imgUrl){
	var img = '<div class="thumbnail"><img src=' + imgUrl + ' width=300px><br>'
	$('#images').append(img)
}


//ICEBUCKET add a search field for additional queries with the code below
// App.prototype.addEventListener = function(){
// 	var that = this;
// 	$('#search-button').on('click', function(event){
// 		event.preventDefault();
// 		var searchText = $('#search-box').val();
// 		that.getSearchedGifs(searchText);
// 	})
// }

// App.prototype.getSearchedGifs = function(searchText){
// 	// this takes our string and replaces the white space with '+' to please the API URL gods.
// 	var searchText = searchText.split(' ').join('+');
// 	var url = "https://api.giphy.com/v1/gifs/search?q=" + searchText + "&api_key=dc6zaTOxFJmzC"
// 	var that = this;
// 	$.ajax({
// 		type: 'GET',
// 		url: url,
// 		success: function(object, status){
// 			that.parseObject(object);
// 		},
// 	    error: function(object, status){
// 	        console.log("There was an error!");
// 	    }
// 	});
// }

