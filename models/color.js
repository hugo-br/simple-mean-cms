var mongoose = require('mongoose');

var Schema = mongoose.Schema;


var colorSchema = new Schema({
    code: String,
	text: String,
	num: Number,
	hex: {type: String, default: ''}
});


var Color = mongoose.model('Colors', colorSchema);
module.exports = Color;