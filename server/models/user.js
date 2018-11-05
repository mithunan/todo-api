var mongoose = require('mongoose');

var User = mongoose.model('User', {
   email: {
      type: String,
      required: true,
      minlength: 2,
      trim: true
   },
   password: {
      type: String
   }
});

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
