
console.log("script js is linked properly");
$(document).ready(function () {

var $signupForm = $("#signup-form");
		$signupForm.on('submit', function(e){
		e.preventDefault();

//select the form and serialize its data

var signupData = $("#signup-form").serialize();
console.log(signupData);

$.post('/user', signupData, function(response){
	console.log(response);
});

var user = $("#signup-form").serialize();
  $.post('/user', user, function(data){
    console.log(data);
 		

 		 });
	});
});