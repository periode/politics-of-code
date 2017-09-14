var express = require('express');
var app = express();
var port = 8000;

app.use(express.static('public'));

app.listen(port, function(){
  console.log('server started on port',port);
});