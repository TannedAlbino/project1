$(document).ready(function() {
	console.log("testing to make sure of connectivity to public app js");
	
	app = new App();
	app.getFunny();
	app.addEventListener();
	app.getFails;
	app.getMotivation;
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

/* #####################################################################
   #	This is the Login Snippet from Bootstrap Snippet
   #   Project       : Modal Login with jQuery Effects
   #   Author        : Rodrigo Amarante (rodrigockamarante)
   #   Version       : 1.0
   #   Created       : 07/29/2015
   #   Last Change   : 08/04/2015
   #
   ##################################################################### */
   
$(function() {
    
    var $formLogin = $('#login-form');
    var $formLost = $('#lost-form');
    var $formRegister = $('#register-form');
    var $divForms = $('#div-forms');
    var $modalAnimateTime = 300;
    var $msgAnimateTime = 150;
    var $msgShowTime = 2000;

    $("form").submit(function () {
        switch(this.id) {
            case "login-form":
                var $lg_username=$('#login_username').val();
                var $lg_password=$('#login_password').val();
                if ($lg_username == "ERROR") {
                    msgChange($('#div-login-msg'), $('#icon-login-msg'), $('#text-login-msg'), "error", "glyphicon-remove", "Login error");
                } else {
                    msgChange($('#div-login-msg'), $('#icon-login-msg'), $('#text-login-msg'), "success", "glyphicon-ok", "Login OK");
                }
                return false;
                break;
            case "lost-form":
                var $ls_email=$('#lost_email').val();
                if ($ls_email == "ERROR") {
                    msgChange($('#div-lost-msg'), $('#icon-lost-msg'), $('#text-lost-msg'), "error", "glyphicon-remove", "Send error");
                } else {
                    msgChange($('#div-lost-msg'), $('#icon-lost-msg'), $('#text-lost-msg'), "success", "glyphicon-ok", "Send OK");
                }
                return false;
                break;
            case "register-form":
                var $rg_username=$('#register_username').val();
                var $rg_email=$('#register_email').val();
                var $rg_password=$('#register_password').val();
                if ($rg_username == "ERROR") {
                    msgChange($('#div-register-msg'), $('#icon-register-msg'), $('#text-register-msg'), "error", "glyphicon-remove", "Register error");
                } else {
                    msgChange($('#div-register-msg'), $('#icon-register-msg'), $('#text-register-msg'), "success", "glyphicon-ok", "Register OK");
                }
                return false;
                break;
            default:
                return false;
        }
        return false;
    });
    
    $('#login_register_btn').click( function () { modalAnimate($formLogin, $formRegister) });
    $('#register_login_btn').click( function () { modalAnimate($formRegister, $formLogin); });
    $('#login_lost_btn').click( function () { modalAnimate($formLogin, $formLost); });
    $('#lost_login_btn').click( function () { modalAnimate($formLost, $formLogin); });
    $('#lost_register_btn').click( function () { modalAnimate($formLost, $formRegister); });
    $('#register_lost_btn').click( function () { modalAnimate($formRegister, $formLost); });
    
    function modalAnimate ($oldForm, $newForm) {
        var $oldH = $oldForm.height();
        var $newH = $newForm.height();
        $divForms.css("height",$oldH);
        $oldForm.fadeToggle($modalAnimateTime, function(){
            $divForms.animate({height: $newH}, $modalAnimateTime, function(){
                $newForm.fadeToggle($modalAnimateTime);
            });
        });
    }
    
    function msgFade ($msgId, $msgText) {
        $msgId.fadeOut($msgAnimateTime, function() {
            $(this).text($msgText).fadeIn($msgAnimateTime);
        });
    }
    
    function msgChange($divTag, $iconTag, $textTag, $divClass, $iconClass, $msgText) {
        var $msgOld = $divTag.text();
        msgFade($textTag, $msgText);
        $divTag.addClass($divClass);
        $iconTag.removeClass("glyphicon-chevron-right");
        $iconTag.addClass($iconClass + " " + $divClass);
        setTimeout(function() {
            msgFade($textTag, $msgOld);
            $divTag.removeClass($divClass);
            $iconTag.addClass("glyphicon-chevron-right");
            $iconTag.removeClass($iconClass + " " + $divClass);
  		}, $msgShowTime);
    }
});
//end of login Bootstrap Snippet
