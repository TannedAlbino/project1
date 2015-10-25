$(document).ready(function() {
	console.log("testing to make sure of connectivity to public app js");
	
	app = new App();
	app.getFunny();
	app.addEventListener();
	app.getFails;
});

function App(){};


App.prototype.getMotivation = function(){
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
	var url = "https://api.giphy.com/v1/gifs/search?limit=10&q=funniest&api_key=dc6zaTOxFJmzC"
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

App.prototype.renderGif = function(imgUrl){
	var img = '<img src=' + imgUrl + '><br>'
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
