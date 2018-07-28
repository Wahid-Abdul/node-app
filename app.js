var express = require('express');
var bodyParser = require("body-parser");
var MongoClient = require('mongodb').MongoClient;

var app = express();

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

var url = "mongodb://localhost:27017/mydb";

MongoClient.connect(url, { useNewUrlParser: true } , function(err, db) {
      if (err) throw err;
      console.log("Database created!");

      var dbo  =  db.db("firsty")
      dbo.createCollection("names",function (err,res) {
        if(err) throw err;
        console.log("\n\n\n\n\nCollection created"+    (res));
        var myobj = { name: "Company Inc", address: "Highway 37" };
        dbo.collection("names").insertOne(myobj, function(err, res) {
            if (err) throw err;
            console.log("1 document inserted");
            db.close();
        });
      });

     
    });





app.get('/', function(req, res){
    res.send("Base URl");
 });
 
app.get('/hello', function(req, res){
    res.send({'name':'abdul wahid'});
    console.log("REQ:"+req[0])
});

app.post('/hello',function(req,res){
    console.log( req.body)    

    res.send(req.body);

});

app.listen(3000);