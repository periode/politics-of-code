var express = require('express');
var app = express();

app.listen(2046, function(){
  console.log('we have started the server');
});


app.get('/', function(request, response, error){
  response.send('hello there');
});











