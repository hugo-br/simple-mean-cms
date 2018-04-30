var Items = require('../models/items');
var bodyParser = require('body-parser'); // looking at the http request

  module.exports = function(app){
	
	app.use(bodyParser.json());
	app.use(bodyParser.urlencoded({ extended: true }));
	
	
	// find all items
	app.get('/api/items', function(req, res){	
 	   Items.find({}, function(err, items) {
         var itemsMap = [];

        items.forEach(function(item) {
            itemsMap.push(item);
			
        });

        res.send(itemsMap);  
      });
	}); // @end
	  
	
    // retrieve a specific item	
	app.get('/api/items/:id', function(req, res){	
	  var item = req.params.id;
	  if (isNaN(item)) {
		  var err = { msg: "not a number"};
		  res.send(err);
	  }
	  else {
	  Items.find({ itemId: item}, function(err, it){
			if(err) {
				throw err;
			} else {

				if ( it.length == 0) {
					;
					var err = {};
					err.msg = "Not a valid item"
					
					res.send(err);
				} else {
					res.send(it);
				}
				
			}
		});
	
	  } 
	}); // @end
	
	
    // create new item or update one existing
	app.post('/api/items', function(req, res){	
	   
    // update
	if(req.body.id){
		Items.findByIdAndUpdate(req.body.id, {$set:req.body}, function (err, result) { 
           if(err){
            console.log(err);
           }
            console.log("RESULT: " + result);
            res.send('Done')
		});		
	// new variable	
		} else {
			
			var item = Items({
					title: req.body.title,
					date : {
						start: req.body.start,
						end: req.body.end
					}
			});
			
			item.save(function(err){
				if(err) throw err;
				res.send('success');
			})
		}	
	}); // @end	

    
   // delete an item
	app.delete('/api/items', function(req,res) {
		Items.findByIdAndRemove(req.body.id, function(err){
			if(err) throw err;
			res.send('successfully deleted');
		});
		
	}); // @end delete
	
	

}