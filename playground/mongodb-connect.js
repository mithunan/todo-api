//DESTRUCTURING
// var user = {name: 'mith', age: 29};
// var {name} = user;
// console.log(name);


//const MongoClient = require('mongodb').MongoClient;
const {MongoClient, ObjectID} = require('mongodb')



MongoClient.connect('mongodb://localhost:27017/TodoApp', {useNewUrlParser: true}, (err, client) => {



   if (err) {
      return console.log('Unable to connect to MongoDB Server');
   }
   console.log('Connected to mongoDB Server');
   const db = client.db('TodoApp');

   // db.collection('Todos').insertOne({
   //    text: 'something to do',
   //    completed: false
   // }, (err, result) => {
   //    if (err) {
   //       return console.log('Unable to insert todo', err);
   //    }
   //    console.log(JSON.stringify(result.ops, undefined, 2));
   // });


 //Insert new doc into Users (name, age, location)

   // db.collection('Users').insertOne({
   //    name: 'Mithunan Ravendren',
   //    age: 29,
   //    location: 'Toronto'
   // }, (err,result) => {
   //    if (err) {
   //       return console.log('Unable to insert users', err);
   //    }
   //    console.log(result.ops[0]._id.getTimestamp());
   // });


   client.close();
});
