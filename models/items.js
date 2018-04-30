var mongoose = require('mongoose'),
    Schema = mongoose.Schema,
    autoIncrement = require('mongoose-auto-increment');
var config = require('../config'); // db credentials
var connection = mongoose.createConnection(config.getDBconnection());
autoIncrement.initialize(connection);
 
var itemSchema = new Schema({
    title: String,
	date : {
		start:{ type: Date, default: Date.now },
		end:{ type: Date, default: '' }
	},
	category: [Number]
});
 

// autoincrement the itemid
itemSchema.plugin(autoIncrement.plugin, {
    model: 'Items',
    field: 'itemId',
    startAt: 1000,
    incrementBy: 1
});


var Item = connection.model('Items', itemSchema);

module.exports = Item;