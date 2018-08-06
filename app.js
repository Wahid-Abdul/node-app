var express = require('express');
var bodyParser = require("body-parser");
var MongoClient = require('mongodb').MongoClient;
var weather = require('openweather-apis');


var app = express();

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

var url = "mongodb://localhost:27017/mydb";


weather.setLang('it');
    // English - en, Russian - ru, Italian - it, Spanish - es (or sp),
    // Ukrainian - uk (or ua), German - de, Portuguese - pt,Romanian - ro,
    // Polish - pl, Finnish - fi, Dutch - nl, French - fr, Bulgarian - bg,
    // Swedish - sv (or se), Chinese Tra - zh_tw, Chinese Sim - zh (or zh_cn),
    // Turkish - tr, Croatian - hr, Catalan - ca
 
 
    // set city by name
    weather.setCity('Delhi');
 	
 
    // 'metric'  'internal'  'imperial'
 	weather.setUnits('metric');
 
    // check http://openweathermap.org/appid#get for get the APPID
 	weather.setAPPID("fb732494742712a14bbfcb6123d20925");



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
  


    //remove
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


  weather.setCity(req.body.name);

  weather.getAllWeather(function(err, JSONObj){
    console.log(JSONObj);
    res.send(JSONObj)
  });

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