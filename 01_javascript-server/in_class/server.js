var express = require('express');
var app = express();

app.listen(2046, function(){
  console.log('we have started the server');
});

app.use(express.static('public'));

app.get('/', function(request, response, error){
  response.send('<h1>hello there from pierre</h1>');
});











