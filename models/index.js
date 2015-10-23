var mongoose = require("mongoose");


mongoose.connect( process.env.MONGOLAB_URI ||
					process.env.MONGOHQ_URL ||
					"mongodb://localhost/project1_app")








//after creating the model, we require and export it

module.exports.Happy = require('./happy.js');
module.exports.Comment = require('./comment.js');

