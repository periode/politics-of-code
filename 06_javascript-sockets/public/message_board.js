var socket = io.connect("http://localhost:2046");

socket.on('open', function(){
  console.log('connected');
});

socket.on('send-back-message', function(data){
  console.log('received', data);
});

function sendRandomStuff(msg){
  
  console.log('sending',msg);
  
  socket.emit('message', msg);
}

