var express = require('express');
var path =  require('path');
var app = express();

var port = 80;

app.use(express.static(path.join(__dirname, 'public')));

var server = app.listen(port, function(){
  console.log('server started on port '+port);
});


var io = require('socket.io')(server);

var all_messages = [];

io.on('connect', function(socket){
  console.log('new socket connected', socket.id);
  
  var greeting_package = {
    greet: "hey there!",
    messages : all_messages
  }
  socket.emit('update', greeting_package);
  
  
  socket.on('message', function(data){
    console.log('receiving',data, 'from', socket.id);
    
    all_messages.push(data);
    
    //forward messages as they come
    io.emit('send-back-message', data);
  });
  
  socket.on('image', function(data){
    console.log(data);
    socket.broadcast.emit('image',data);
  });
});














