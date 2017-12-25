var mongoose = require('mongoose');
var tagSchema = require('../schemas/tags');


module.exports = mongoose.model("Tag",tagSchema);