var Cats = require('../models/categories');
var Items = require('../models/items');
var Color = require('../models/color');;
var bodyParser = require('body-parser'); // looking at the http request


function nameSort(param, dir) {
	var res;
	switch (param) {
    case 'name':
        res = "title";
        break;
    case 'date':
        res = "date";
        break;
    case 'catid':
        res = "catId";
        break;
    case 'id':
        res = "itemId";
        break;
    case  '':
	default:
        res = "date";
    }
	
	if(dir == 'desc'){
		res  = '-'+res;
	} 
	
	return res;
}

  module.exports = function(app, _DIR){
	  
//	app.use(bodyParser.json());
	app.use(bodyParser.urlencoded({ extended: true }));
	  
// page for an item
	app.get('/items/:name/:id', function(req, res){	
	 var id = req.params.id;
     Items.findOne({'itemId': id}, function(err, item){
		var file = _DIR + '/public/html/template/item-template.ejs';
	    res.render('item', { title: 'page test', item: item, content: file});
     });
 	   
	}); // @end

 


// category page 
	app.get('/category/:name/:id', function(req, res){	
	 var id = req.params.id;
	 
	 if (isNaN(id)) {
		 res.status(404).send('Not found');
	  }
	  
	  
     Cats.findOne({'catId': id}, function(err, cat) {
		 
         if (cat != null) {
		
	
		  var sort = req.query.sort || "";//'-date.start';	 
	      var dir =  req.query.dir|| "";
		  var lim = Number(req.query.lim) || "";
		  var sortby = nameSort(sort, dir);
		  
/*	
	   	  Items.find({ category: { "$in" : [id]} }, function(err, items) {			  
			  var itemsMap = [];
			  items.forEach(function(item) {
				var itMap = {};
				 itMap.id = item.itemId; // id
				 itMap.name = item.title; // name
				 itMap.skus = item.skus || ""; // skus
                 itemsMap.push(itMap); // push the result
              });
			  
		      var file = _DIR + '/public/html/template/category.ejs';
			  res.render('category', { title: cat.name, item: itemsMap, category: cat, content: file});
			  
		  // check if any items
		//	  if (itemsMap.length == 0 ) {				
		//		res.render('category', { title: cat.name, item: itemsMap});
		//	  } else {
		//		res.render('category', { title: 'category test', item: itemsMap});
		//	  }
			  
		
	      }).sort(sortby).limit(lim); */		
		  
Items.
  find({ category: { "$in" : [id]} }).
  sort(sortby).
  populate('skus.color').
  limit(lim).
  exec(function (err, items) {
    if (err) throw (err);
      var itemsMap = [];
	  for (let item of items) {
           var itMap = {};
                 itMap.id = item.itemId; // id
				 itMap.name = item.title; // name
				 itMap.skus = item.skus || ""; // skus
			     itemsMap.push(itMap); // push the result
			
		  } // @end for
 		      
			  var file = _DIR + '/public/html/template/category.ejs';
			  res.render('category', { title: cat.name, item: itemsMap, category: cat, content: file});      
  });
 
		  
		  
		 } else {
			 res.status(404).send('Not found');
		 }

     });
	 

 	   
	}); // @end
	
	
	
  };