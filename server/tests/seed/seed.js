const {ObjectID} = require('mongodb');
const jwt = require('jsonwebtoken');

const {Todo} = require('./../../models/todo');
const {User} = require('./../../models/user');

const userOneId = new ObjectID()
const userTwoId = new ObjectID()
const users = [{
   _id: userOneId,
   email: 'mith@gmail.com',
   password: 'userOnePass',
   tokens: [{
      access: 'auth',
      token: jwt.sign({_id: userOneId, access: 'auth'}, '727smv').toString()
   }]
}, {
      _id: userTwoId,
      email: 'raven@gmail.com',
      password: 'userTwoPass',
}];

const todos = [{
   _id: new ObjectID(),
   text: 'First Test Todo'
}, {
   _id: new ObjectID(),
   text: 'Second Test Todo',
   completed: true,
   completedAt: 333
}];

const populateTodos = (done) => {
   Todo.deleteMany({}).then(() => {
      return Todo.insertMany(todos);
   }).then(() => done());
}

const populateUsers = (done) => {
   User.remove({}).then(() => {
      var userOne = new User(users[0]).save();
      var userTwo = new User(users[1]).save();

      return Promise.all([userOne, userTwo])
   }).then(() => done());
};

module.exports = {todos, populateTodos, users, populateUsers};
