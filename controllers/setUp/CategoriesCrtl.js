var bodyParser = require('body-parser'); // looking at the http request
var Cats = require('../../models/categories');
var Items = require('../../models/items');
var Colors = require('../../models/color');

module.exports = function(app){
	
	app.get('/api/setupCats', function(req, res){
		
		// seed database
		var starterCats = [
		  {
			name: 'Comedy',
		  }, 
          {
			name: 'Sports'  
		  }		  
		]
		
		// sending data to database
		Cats.create(starterCats, function(err, results){
			res.send(results);
			res.end("hey");
		});
		
	}); // @end /api/setupCats
	
	
	app.get('/api/setupBooks', function(req, res){
		
		// seed database
		var starterCats = [
		{ title: 'super item seven',
		  category: [100, 103],
		  price: 77.99,
		  skus: [
		    { color: '5ae7a423608999044cf95243',
		      desc: [{size: 'S', qte: 0}, {size: 'M', qte: 2}, {size: 'L', qte: 1}]			
	        }, 	
		    { color: '5ae7a423608999044cf95242',
		      desc: [{size: 'S', qte: 4}, {size: 'M', qte: 2}, {size: 'L', qte: 8}]			
	        } 	      		  
		  ]
		},

		{ title: 'super item height',
		  category: [101, 105],
		  price: 23.99,
		  skus: [
		    { color: '5ae7a423608999044cf95241',
		      desc: [{size: 'S', qte: 2}, {size: 'M', qte: 8}, {size: 'L', qte: 1}]			
	        }, 	
		    { color: '5ae7a423608999044cf95242',
		      desc: [{size: 'S', qte: 4}, {size: 'M', qte: 2}, {size: 'L', qte: 6}]			
	        } 	      		  
		  ]
		},
	
		
		]
		
		// sending data to database
		Items.create(starterCats, function(err, results){
			if (err) throw err;
			res.send(results);
		});
	
		
	}); // @end /api/setupCats	
	
	
	app.get('/api/setupColors', function(req, res){
		
		// seed database
		var starterColors = [
		{
         code: 'BLU',
		 text: 'blue',
		 num: 100
		},

		{
         code: 'RED',
		 text: 'red',
		 num: 101
		},
		{
         code: 'GRN',
		 text: 'green',
		 num: 102
		},
		
		]
		
		// sending data to database
		Colors.create(starterColors, function(err, results){
			res.send(results);
		});
	
		
	}); // @end /api/setupCats		
	
	
}