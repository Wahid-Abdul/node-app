var express = require('express');
var bodyParser = require("body-parser");
var MongoClient = require('mongodb').MongoClient;
var out = require('./outside.js')
// var async = require("async");


var app = express();

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

var url = "mongodb://localhost:27017/mydb";



//remove
MongoClient.connect(url, { useNewUrlParser: true } , function(err, db) {
      if (err) throw err;
      console.log("Database created!");

      var dbo  =  db.db("firsty")
      dbo.createCollection("names",function (err,res) {
        if(err) throw err;
        console.log("\n\n\n\n\nCollection created"+    (res));
        var myobj = { name: "Company Inc", address: "Highway 37" };
       
      });
      db.close();
     
    });



    



app.get('/', function(req, res){
    res.send("Base URl");
 });



app.get('/hello', function(req, res){ 

 
 console.log("REQ:"+req[0])
  
    MongoClient.connect(url, function(err, db) {
      if (err) throw err;
      var dbo = db.db("firsty");
      dbo.collection("names").find({}).toArray( function(err, result) {
        if (err) throw err;
        console.log("result    :"+result);
        res.send(result  );
        db.close();
      });
    });


});

app.post('/hello',function(req,res){
    console.log( req.body)    

    res.send(req.body);

    //remove
    MongoClient.connect(url, { useNewUrlParser: true } , function(err, db) {
      if (err) throw err;
      console.log("Database created!");

        var dbo  =  db.db("firsty")
        myobj = req.body
        dbo.collection("names").insertOne(myobj, function(err, res) {
            if (err) throw err;
            console.log("1 document inserted");
            db.close();
        });

     
    });
    
});

app.post('/getWeather',function(req,res){



  out.wahid(req.body.name,function(result){console.log("\n\n\n\n\n\n\n\n"+result+"\n\n\n\n\n\n\n");res.send(result)});


});

app.post('/clear',function(req,res){
  console.log( "clear function invoked")    

  MongoClient.connect(url, function(err, db) {
    if (err) throw err;
    var dbo = db.db("firsty");
    dbo.collection("names").drop(function(err, delOK) {
      if (err) throw err;
      if (delOK) console.log("Collection deleted");
      db.close();
    });
  });


  res.send("cleared");
});


const host = '0.0.0.0';
const port = process.env.PORT || 3000;


app.listen(port, host, function() {
  console.log("Server started.......");
});