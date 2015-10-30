
console.log("script js is linked properly");
$(document).ready(function () {

var $signupForm = $("#signup-form");
		$signupForm.on('submit', function(e){
		e.preventDefault();

});
//select the form and serialize its data

var signupData = $("#signup-form").serialize();
// console.log(signupData);
// username and password correctly being taken
// $.post('/user', signupData, function(response){
// 	console.log(response);
// 	});

$("#signup-form").on("submit", function(e) {
	e.preventDefault();
	var signupData = $("#signup-form").serialize();
	$.ajax({
		url: '/user',
		type: "POST",
		data: signupData
	}).done(function(response){
		console.log(response)
		window.location.assign("/home");
	});
});
// var loginData = $("#login-form").serialize();
//is this the correct syntax for where the login-form is?
$('#login-form').on('submit', function(e) {
	e.preventDefault();

	//select form and serialize its data
	var loginData = $("#login-form").serialize();
	console.log(loginData);
	$.ajax({
		url: '/session',
		type: "POST",
		data: loginData
	}).done(function(response){
		console.log(response);
		window.location.assign("/home");
	});
});

})
	// send POST request to /login with the form data
	// $.post('/session', loginData, {async: true}, function(response) {
		

		// console.log(response);
		// });
	// });


// var user = $("#signup-form").serialize();
//   $.post('/user', user, function(data){
//     console.log(data);
 		

//  		 });

