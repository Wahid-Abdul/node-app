var MongoClient = require('mongodb').MongoClient;
//Create a database named "mydb":
var url = "mongodb://localhost:27017/mydb";

MongoClient.connect(url, { useNewUrlParser: true } , function(err, db) {
  if (err) throw err;
  console.log("Database created!");
  db.close();
});
