//const MongoClient = require('mongodb').MongoClient;
const {MongoClient, ObjectID} = require('mongodb')

MongoClient.connect('mongodb://localhost:27017/TodoApp', {useNewUrlParser: true}, (err, client) => {
   if (err) {
      return console.log('Unable to connect to MongoDB Server');
   }
   console.log('Connected to mongoDB Server');
   const db = client.db('TodoApp');

   //deleteMany
   // db.collection('Todos').deleteMany({text: 'Eat lunch'}).then((result) => {
   //    console.log(result);
   // });

   //deleteOne
   // db.collection('Todos').deleteOne({text: 'Eat lunch'}).then((result) => {
   //    console.log(result);
   // });

   //findOneAndDelete
   // db.collection('Todos').findOneAndDelete({completion: false}).then((result) => {
   //    console.log(result);
   // });

   //USERS deleteMany
   // db.collection('Users').deleteMany({name: 'Mithunan'}).then((result) => {
   //    console.log(result);
   // });

   //USERS deleteOne
   db.collection('Users').deleteOne({
      _id: new ObjectID('5be054cb95ad808abcbfbe85')
   }).then((result) => {
      console.log(JSON.stringify(result, undefined, 2));
   });


   //client.close();
});
