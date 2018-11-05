var mongoose = require('mongoose');

var Todo = mongoose.model('Todo', {
   text: {
      type: String,
      required: true,
      minlength: 2,
      trim: true
   },
   completed: {
      type: Boolean,
      default: false
   },
   completedAt: {
      type: Number,
      default: null
   }
});

module.exports = {Todo};


// var otherTodo = new Todo({
//    text: '   Wireframe for MEP   '
// });
//
// otherTodo.save().then((doc) => {
//    console.log(JSON.stringify(doc, undefined, 2));
// }, (e) => {
//    console.log('Unable to save todo');
//    console.log('---------------------------');
//    console.log(e);
// });
