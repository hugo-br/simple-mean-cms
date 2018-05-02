var mongoose = require('mongoose'),
    Schema = mongoose.Schema,
    autoIncrement = require('mongoose-auto-increment');
var config = require('../config'); // db credentials
var connection = mongoose.createConnection(config.getDBconnection());
autoIncrement.initialize(connection);
 
var itemSchema = new Schema({
    title: String,
	description: String,
	date : {
		start:{ type: Date, default: Date.now },
		end:{ type: Date, default: '' }
	},
	category: [Number],
	price: { type: Number, default: 10 },
	skus: [
	   {
		color: {type: Schema.Types.ObjectId, ref: 'Colors' }, 
        text: { type: String, default: '' },	
		desc: [
		  {
		   size: { type: String, default: 'Unique' },
           qte: { type: Number, default: 0 }	  
		  }
		]			
	   }, 
	   
	]
	
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