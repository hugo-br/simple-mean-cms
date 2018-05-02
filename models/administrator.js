var mongoose = require('mongoose'),
    Schema = mongoose.Schema,
    bcrypt = require('bcrypt'),
    SALT_WORK_FACTOR = 10;

var AdminSchema = new Schema({
  
  firstName: {
    type: String
  },
  
  lastName: String,
  
  role: {
    type: String,
    default: 'user'
  },
  
  email: {
    required: true,
    unique: true,
    type: String,
    set: val => val.toLowerCase()
  },
  
  password: {
    type: String,
    required: true
  },
  
  createdOn: {
    type: Date,
    default: Date.now
  },
  
  updatedOn: {
    type: Date,
    default: Date.now
  }
  
});

AdminSchema.virtual('fullname').get(function () {
  let firstName = this.firstName || ''
  let lastName = this.lastName || ''
  return _.trim(`${firstName} ${lastName}`)
});

/*
AdminSchema.virtual('response').get(function () {
  return {
    _id: this._id,
    firstName: this.firstName,
    lastName: this.lastName,
    email: this.email,
    token: this.token
  }
});
*/ 

/*
AdminSchema.virtual('token').get(function () {
  let payload = {
    _id: this._id,
    role: this.role
  }

  return Jwt.signToken(payload)
})
*/


AdminSchema.pre('save', function(next) {
    var user = this;

    // only hash the password if it has been modified (or is new)
    if (!user.isModified('password')) return next();

    // generate a salt
    bcrypt.genSalt(SALT_WORK_FACTOR, function(err, salt) {
        if (err) return next(err);

        // hash the password along with our new salt
        bcrypt.hash(user.password, salt, function(err, hash) {
            if (err) return next(err);

            // override the cleartext password with the hashed one
            user.password = hash;
            next();
        });
    });
});

AdminSchema.methods.comparePassword = function(candidatePassword, cb) {
    bcrypt.compare(candidatePassword, this.password, function(err, isMatch) {
        if (err) return cb(err);
        cb(null, isMatch);
    });
};





var Admin = mongoose.model('Admin', AdminSchema);
module.exports = Admin;