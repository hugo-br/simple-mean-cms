var Cats = require('../models/categories');
var Items = require('../models/items');
var bodyParser = require('body-parser'); // looking at the http request


  module.exports = function(app){
	  
//	app.use(bodyParser.json());
//	app.use(bodyParser.urlencoded({ extended: true }));
	  
	// page for an item
	app.get('/items/:name/:id', function(req, res){	
	 var id = req.params.id;
     Items.findOne({'itemId': id}, function(err, item){
	    res.render('item', { title: 'page test', item: item});
     });
 	   
	}); // @end

// 


	// category page 
	app.get('/category/:name/:id', function(req, res){	
	 var id = req.params.id;
	 
	 if (isNaN(id)) {
		 res.status(404).send('Not found');
	  }
	  
	  
     Cats.findOne({'catId': id}, function(err, cat) {
		 
         if (cat != null) {
	   	  Items.find({ category: { "$in" : [id]} }, function(err, items) {
		     			  
			  var itemsMap = [];
			  items.forEach(function(item) {
				var itMap = {};
				 itMap.id = item.itemId; // id
				 itMap.name = item.title; // name
                 itemsMap.push(itMap); // push the result
              });
			  
			  
			  res.render('category', { title: cat.name, item: itemsMap, category: cat});
			  
		/*	  // check if any items
			  if (itemsMap.length == 0 ) {				
				res.render('category', { title: cat.name, item: itemsMap});
			  } else {
				res.render('category', { title: 'category test', item: itemsMap});
			  }
		*/	  
		
	      });			 
		 } else {
			 res.status(404).send('Not found');
		 }

     });
	 

 	   
	}); // @end
	
	
	
  };