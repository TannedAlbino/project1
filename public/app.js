$(document).ready(function() {
	console.log("testing to make sure of connectivity to public app js");
	
	app = new App();
	app.getFunny();
	app.addEventListener();
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


App.prototype.getFunnyPic = function(){
	var url = "https://api.giphy.com/v1/gifs/search?q=Motivation&limit=10&api_key=dc6zaTOxFJmzC"
	var that = this
	$.ajax({
		// this is a GET request. I'm keeping it explicate for you, 
		// but all ajax calls are GET by default, so this next line isn't 
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
App.prototype.getFunny = function(){
	var url = "https://api.giphy.com/v1/gifs/search?limit=10&q=funny&api_key=dc6zaTOxFJmzC"
	var that = this
	$.ajax({
		// this is a GET request. I'm keeping it explicate for you, 
		// but all ajax calls are GET by default, so this next line isn't 
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

App.prototype.parseObject = function(object){
	$('#gifs').empty();
	var gifs = object.data;
	var that = this;
	gifs.forEach(function(gifObject){
		that.renderGif(gifObject.images.fixed_height.url)
	});
};
//can simply add a height and width in this image source
App.prototype.renderGif = function(imgUrl){
	var img = '<div class="thumbnail"><img src=' + imgUrl + ' width=300px><br>'
	$('#gifs').append(img)
}

App.prototype.addEventListener = function(){
	var that = this;
	$('#search-button').on('click', function(event){
		event.preventDefault();
		var searchText = $('#search-box').val();
		that.getSearchedGifs(searchText);
	})
}

App.prototype.getSearchedGifs = function(searchText){
	// this takes our string and replaces the white space with '+' to please the API URL gods.
	var searchText = searchText.split(' ').join('+');
	var url = "https://api.giphy.com/v1/gifs/search?q=" + searchText + "&api_key=dc6zaTOxFJmzC"
	var that = this;
	$.ajax({
		type: 'GET',
		url: url,
		success: function(object, status){
			that.parseObject(object);
		},
	    error: function(object, status){
	        console.log("There was an error!");
	    }
	});
}

