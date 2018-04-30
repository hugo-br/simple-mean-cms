var express = require('express');
var app = express();
var port = process.env.PORT || 5000; // set port
var mongoose = require('mongoose');
var config = require('./config'); // db credentials
var categoriesAPI = require('./controllers/categoriesAPI');
var itemsAPI = require('./controllers/itemsAPI');
var pages = require('./controllers/pagesRender');

// REMOVE
var setUpCat = require('./controllers/setUp/CategoriesCrtl'); 




app.use('/assets', express.static(__dirname + '/public')); // set public directory
app.set('view engine', 'ejs'); // set view engine


// connect to database
mongoose.connect(config.getDBconnection());

// pages
pages(app);

// categories end point
categoriesAPI(app);

// categories end point
itemsAPI(app);

// create endpoint for setup
setUpCat(app);



// index page
app.get('/', function(req, res) {
	res.render('index', {title: "Homepage"});	
});




app.listen(port);