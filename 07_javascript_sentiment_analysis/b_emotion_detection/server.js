var express = require('express');
var path =  require('path');
var app = express();

var port = 2046;

app.use(express.static(path.join(__dirname, 'public')));

var server = app.listen(port, function(){
  console.log('server started on port '+port);
});
