var mongoose = require('mongoose');
var validator = require('validator');
const jwt = require('jsonwebtoken');
const _ = require('lodash');

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
      },
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
