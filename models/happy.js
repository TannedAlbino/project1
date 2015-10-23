var mongoose= require('mongoose');
var Comment = require('./comment');


var HappySchema = mongoose.Schema({
	id: "String",
	image:"String",
	name:"String",
	type:"String",
	comment:"String" 
});

var Happy = mongoose.model('Happy', HappySchema);

module.exports = Happy;
