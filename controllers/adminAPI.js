var adminAuth = require('./adminAuth');
var bodyParser = require('body-parser'); // looking at the http requestvar
var jsonwebtoken = require("jsonwebtoken");
var cookieSession = require('cookie-session');

module.exports = function(app){
	



	app.use(bodyParser.json());

	


	
	app.route('/admin/login')
	    .get(adminAuth.adminRequired, function(req, res){
			res.send("yo");
		});
	
	app.route('/api/admin/login')
		.get(adminAuth.signIn); // show the login page
	//	.post(adminAuth.sign_in);
	
	app.route('/api/admin/logout')
		.post(adminAuth.signIn); // show the login page
	
}

