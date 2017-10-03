var express = require('express');
var path =  require('path');
var app = express();

var port = 8080;

app.use(express.static(path.join(__dirname, 'public')));

var server = app.listen(port, function(){
  console.log('server started on port '+port);
});


var io = require('socket.io');


io.on('connect', function(socket){
  console.log('new socket connected', socket);
});
