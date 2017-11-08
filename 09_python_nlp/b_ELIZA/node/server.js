var express = require('express')
var eliza = require('./eliza.js')
var bp = require('body-parser')
var port = 2046;
var app = express();

app.use(bp.urlencoded({
  extended: true
}));
app.use(bp.json());

app.listen(port, function(){
  console.log('listening on', port);
});

app.get('/', function(req, res, err){
  res.sendFile(__dirname+'/public/index.html');
});

app.post('/discuss', function(req, res, err){
  console.log('human said:',req.body.words);
  var answer = eliza.process(req.body.words)
  res.send(answer);
});
