var express = require('express');
var mongoose = require("mongoose");
var bodyParser = require("body-parser");




var app = express();

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());







app.get('/', function(req, res){
    res.send("Base URl");
 });
 
app.get('/hello', function(req, res){
    res.send({'name':'abdul wahid'});
    console.log("REQ:"+req[0])
});

app.post('/hello',function(req,res){
    (res.send(res.body));
    console.log( req.body)    

});

app.listen(3000);