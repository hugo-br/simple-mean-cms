var Admin = require('../models/administrator');
var jwt = require('jsonwebtoken');
// var bcrypt = require('bcrypt');
// var cookieSession = require('cookie-session');


module.exports = {
    
  adminRequired : function(req, res, next) {
    
    
   
   if (req.session.admin){
    var token = req.session.admin;
	
   // get the decoded payload and header
    jwt.verify(token, 'userSupaDupaPower', function(err, decoded){
    if(!err){
      next();
    } else {
       return res.status(401).json({ message: 'Unauthorized user!' });
    }
	});
	} else {
		return res.status(401).json({ message: 'Not log' });
	}
 },
	
	signIn : function(req, res) {
	var em = req.body.email || "admin@test.com";
	var pwd = req.body.pwd || "Password123";
	  
      Admin.findOne({ email: em }, function(err, user) {
        
		 if(user) {
		 user.comparePassword(pwd, function(err, isMatch) {
			  if (err) throw err;
			  if (!isMatch){
                 return res.status(401).json({ message: 'Authentication failed. Invalid user or password.' });
              } else {

		        var token = jwt.sign({  
				   email: user.email, fullName: 
				   user.fullName, 
				   _id: user._id, 
				   agent: req.headers['user-agent']}, 
				'userSupaDupaPower', { expiresIn: '1d' });
				  
               
            
			
           // Update token
           req.session.admin = (token);
          
		// res.cookie('adminToken', token, { maxAge: 900000, httpOnly: true });
        //        console.log('cookie created successfully');	
		//		res.send(token);
		
				
            // Write response
            res.end(req.session.admin);

			    
				 

			  }
		 }); 
		 
		 
		 } else {
			return res.status(403).json({ message: 'Not found' }); 
		 }
		 
		 
      });
	  
	}, 
	
	

};
