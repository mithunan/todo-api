var mongoose = require('mongoose');
var validator = require('validator');
const jwt = require('jsonwebtoken');
const _ = require('lodash');
const bcrypt = require('bcryptjs');

var UserSchema = new mongoose.Schema({
   email: {
      type: String,
      required: true,
      trim: true,
      minlength: 2,
      unique: true,
      validate: {
         validator: validator.isEmail,
         message: '{VALUE} is not a valid email'
      }
   },
   password: {
      type: String,
      required: true,
      minlength: 6
   },
   tokens: [{
      access: {
         type: String,
         require: true
      },
      token: {
         type: String,
         require: true
      }
   }]
});

UserSchema.methods.toJSON = function () {
   var user = this;
   var userObject = user.toObject();

   return _.pick(userObject, ['_id', 'email']);
};

UserSchema.methods.generateAuthToken = function () {
   var user = this;
   var access = 'auth';
   var token = jwt.sign({_id: user._id.toHexString(), access}, '727smv').toString();

   //user.tokens.push({access, token});
   user.tokens = user.tokens.concat([{access, token}]);

   return user.save().then(() => {
      return token;
   });
};

UserSchema.statics.findByToken = function (token) {
  var User = this;
  var decoded;

  try {
    decoded = jwt.verify(token, '727smv');
  } catch (e) {
   return Promise.reject('test');
  }

  return User.findOne({
    '_id': decoded._id,
    'tokens.token': token,
    'tokens.access': 'auth'
  });
};

UserSchema.statics.findByCredentials = function (email, password) {
   var User = this;

   return User.findOne({email}).then((user) => {
      if (!user) {
         return Promise.reject();
      }

      return new Promise((resolve, reject) => {
         bcrypt.compare(password, user.password, (err, res) => {
            if (res){
               resolve(user);
            } else {
               reject();
            }
         });
      });
   });
};

UserSchema.pre('save', function (next) {
   var user = this;

   if(user.isModified('password')){
      bcrypt.genSalt(10,(err, salt) => {
         bcrypt.hash(user.password, salt, (err, hash) => {
            user.password = hash;
            next();
         });
      });
   }else{
      next();
   }
});

var User = mongoose.model('User', UserSchema);

module.exports = {User};

// var newUser = new User({
//    email: '',
//    password: '12345678'
// });
//
// newUser.save().then((doc) => {
//    console.log(JSON.stringify(doc, undefined, 2));
// }, (e) => {
//    console.log('Unable to save User');
//    console.log('---------------------------');
//    console.log(e);
// });
