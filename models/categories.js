var mongoose = require('mongoose'),
    Schema = mongoose.Schema,
    autoIncrement = require('mongoose-auto-increment');
var config = require('../config'); // db credentials
var connection = mongoose.createConnection(config.getDBconnection());
autoIncrement.initialize(connection);


var catSchema = new Schema({
	catId: { 
	    type: [Number], 
		unique: true,
		
	}, 
	
    name: {
        type: String,
        required: true
      },
	
	date : {
		start:{ type: Date, default: Date.now },
		end:{ type: Date, default: '' }
	}, 
	
	metadata : {
		title: {type: String, default: ''},
		keywords: {type: [], default: ''}	
	}
	
});

catSchema.plugin(autoIncrement.plugin, {
    model: 'Categorie',
    field: 'catId',
    startAt: 100,
    incrementBy: 1
});


/*
personSchema.virtual('fullName').
  get(function() { return this.name.first + ' ' + this.name.last; }).
  set(function(v) {
    this.name.first = v.substr(0, v.indexOf(' '));
    this.name.last = v.substr(v.indexOf(' ') + 1);
  });
 */ 


var categories = mongoose.model('Categorie', catSchema);
module.exports = categories;