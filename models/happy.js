var mongoose= require('mongoose');
var Comment = require('./comment');

//cahnge name to something more descriptive like image 
var HappySchema = mongoose.Schema({
	//will  be generated
	//id: "String",
	image:"String",
	name:"String",
	type:"String",
	
//leaving this out now, can be a functionality later
	 // /comment:"String" 
});

var Happy = mongoose.model('Happy', HappySchema);

module.exports = Happy;
