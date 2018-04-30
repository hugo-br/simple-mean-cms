var bodyParser = require('body-parser'); // looking at the http request
var Cats = require('../../models/categories');
var Items = require('../../models/items');

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
		{
         title: 'blue car',
		 category: [102, 103]
		},

		{
         title: 'red car',
		 category: [101, 105]
		},
		{
         title: 'green car',
		 category: [102, 100]
		},
		
		]
		
		// sending data to database
		Items.create(starterCats, function(err, results){
			res.send(results);
		});
	
		
	}); // @end /api/setupCats	
	
	
}