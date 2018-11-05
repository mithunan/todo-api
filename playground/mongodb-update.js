//const MongoClient = require('mongodb').MongoClient;
const {MongoClient, ObjectID} = require('mongodb')

MongoClient.connect('mongodb://localhost:27017/TodoApp', {useNewUrlParser: true}, (err, client) => {
   if (err) {
      return console.log('Unable to connect to MongoDB Server');
   }
   console.log('Connected to mongoDB Server');
   const db = client.db('TodoApp');
   //
   // db.collection('Todos').findOneAndUpdate({
   //    _id: new ObjectID('5be04f7fe96c713d849f9b31')
   // }, {
   //    $set: {completed: true}
   // }, {
   //    returnOriginal: false
   // }).then((result) => {
   //    console.log(result);
   // });




   db.collection('Users').findOneAndUpdate({
      _id: new ObjectID('5be054a57c5a8c229cd22389')
   }, {
      $set: {name: 'Myth Raven'},
      $inc: {age: -1}
   }, {
      returnOriginal: false
   }).then((result) => {
      console.log(result);
   });

   //client.close();
});
