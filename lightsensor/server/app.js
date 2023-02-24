var express = require('express');
var MongoClient = require('mongodb').MongoClient;
var url = 'mongodb://175.178.118.138:27017/';
var http = require('http')
var cors =require('cors');
var app = express()
var bodyParser = require('body-parser')
app.use(cors())
app.use(express.json())
app.use(bodyParser.urlencoded({extended:true}))

app.post('/add',function(req,res) {
    console.log(req.data)
  new Promise(function(resolve,reject){
    MongoClient.connect(url,function(err,db){
      if(err){
        throw err;
      }
      var value = req.body.value
      console.log('req.body:',req.body)
      
      var dbase = db.db('test');
      dbase.collection('site').insertOne({value:value},function (err,ret) {
          if(err){
            res.send({
              status:500,
              message:'Unknown error'
            })
          }
          resolve(ret)
          db.close();
      })
    })
  }).then(function(data){
    res.send({
      status:200,
      message:'Success！'
    })
  })
})


http.createServer(app).listen(9999,function(){
    console.log('start')
})