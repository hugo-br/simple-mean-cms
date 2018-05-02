var port = process.env.PORT || 5000; // set port
var express = require('express');
var app = express();

// add-ons
var cookieParser = require('cookie-parser');
var cookieSession = require('cookie-session')
var mongoose = require('mongoose');
var config = require('./config'); // db credentials
var compression = require('compression');
var jwt = require('jsonwebtoken'); // token

// routes
var categoriesAPI = require('./controllers/categoriesAPI');
var itemsAPI = require('./controllers/itemsAPI');
var pages = require('./controllers/pagesRender');
var adminAPI = require('./controllers/adminAPI');
var setUpCat = require('./controllers/setUp/CategoriesCrtl'); // REMOVE


app.use(cookieParser());  // set-up client cookie
app.use('/assets', express.static(__dirname + '/public')); // set public directory
app.set('view engine', 'ejs'); // set view engine
app.use(compression()); // compress the response


app.set('trust proxy', 1) // trust first proxy
app.use(cookieSession({
  name: 'session',
  keys: ['key1', 'key2']
}));


var initToken = jwt.sign({  date:  Date.now()}, config.getSessionKey()); // init cookie

app.use(function(req, res, next){
	res.cookie('initToken', initToken, { maxAge: 900000, httpOnly: true });
	next();
  });



				   

app.on('listening', function () {
    // server ready to accept connections here
	res.cookie('initToken', initToken);
	console.log(initToken);
});



// connect to database
mongoose.connect(config.getDBconnection());

// pages
pages(app, __dirname);

// categories end point
categoriesAPI(app);

// categories end point
itemsAPI(app);

// create endpoint for setup
setUpCat(app);

// admin endpoints
adminAPI(app);

// index page
app.get('/', function(req, res) {
	res.render('index', {title: "Homepage"});	
});




app.listen(port);