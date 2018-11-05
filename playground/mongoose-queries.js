const {ObjectID} = require('mongodb');

const {mongoose} = require('./../server/db/mongoose');
const {Todo} = require('./../server/models/todo');
const {User} = require('./../server/models/user');

// var id = '5be0a22f1aeb5a6e88167b777';
//
// if(!ObjectID.isValid(id)) {
//    console.log('ID Not Valid');
// }

// Todo.find({
//    _id: id
// }).then((todos) => {
//    console.log('Todos', todos);
// });
//
// Todo.findOne({
//    _id: id
// }).then((todo) => {
//    console.log('Todo', todo);
// });

// Todo.findById(id).then((todo) => {
//    if (!todo) {
//       return console.log('ID Not Found!');
//    }
//    console.log('Todo by ID', todo);
// }).catch((e) => console.log(e));

User.findById('5be08ca7761ac63cf8ccd5bf').then((user) => {
   if (!user) {
      return console.log('Unable to find user');
   }
   console.log(JSON.stringify(user, undefined, 2));
}, (e) => {
   console.log(e);
})
