var Cats = require('../models/categories');
var bodyParser = require('body-parser'); // looking at the http request




module.exports = function(app){
	
	app.use(bodyParser.json());
	app.use(bodyParser.urlencoded({ extended: true }));
	
	
	// find all categories
	app.get('/api/categories', function(req, res){	
 	   Cats.find({}, function(err, cats) {
         var catMap = [];

        cats.forEach(function(cat) {
            catMap.push(cat);
			
        });

        res.send(catMap);  
      });
	}); // @end


// find all categories
	app.get('/api/categories/all/active', function(req, res){	
 	   Cats.find({ $or:[ {'parent':"true"}, {'parent':true} ]}, function(err, cats) {
        var catMap = [];
        var date = new Date(); // today
        cats.forEach(function(cat) {
	      if ( (cat.date.end == null && cat.date.start < date) || ( cat.date.end != null && cat.date.start < date && cat.date.end > date) ) {			   
			  catMap.push(cat);	
			}
        });
        res.send(catMap);  
      });
	}); // @end	
	
	
	// find all categories
	app.get('/api/categories/all/names', function(req, res){	
	 
 	  Cats.find({}, function(err, cats) {
         var catMap = [];

        cats.forEach(function(cat) {
            catMap.push(cat.name);
			
        });

        res.send(catMap);  
		});
      }); // @end
	  
	  
	app.get('/api/categories/:id', function(req, res){	
	  var cat = req.params.id;
	  if (isNaN(cat)) {
		  var err = { msg: "not a number"};
		  res.send(err);
	  } else {
	  Cats.find({ catId: cat}, function(err, cat){
			if(err) {
				throw err;
			} else {

				if ( cat.length == 0) {
					;
					var err = {};
					err.msg = "Not a valid categorie"
					
					res.send(err);
				} else {
					res.send(cat);
				}
				
			}
		});	
	  }
	}); // @end
	
	
	// create new category or update one existing
	app.post('/api/categories', function(req, res){	
	   
    // update
	if(req.body.id){
		Cats.findByIdAndUpdate(req.body.id, {$set:req.body}, function (err, result) { 
           if(err){
            console.log(err);
           }
            console.log("RESULT: " + result);
            res.send('Done')
		});		
	// new variable	
		} else {
			
			var category = Cats({
					name: req.body.name,
					date : {
						start: req.body.start,
						end: req.body.end
					}
			});
			
			category.save(function(err){
				if(err) throw err;
				res.send('success');
			})
		}	
	}); // @end	

   
   // delete a category
	app.delete('/api/categories', function(req,res) {
		Cats.findByIdAndRemove(req.body.id, function(err){
			if(err) throw err;
			res.send('successfully deleted');
		});
		
	}); // @end delete

}