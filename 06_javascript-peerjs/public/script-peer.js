var api_key = 'c83xx8lhssoo5hfr';
var peer;

peer = new Peer('pierre', {key: api_key});
var my_connection;


function init(){
  //cross-browser compatibility
  window.URL = window.URL || window.webkitURL || window.mozURL || window.msURL;
  navigator.getUserMedia = navigator.getUserMedia || navigator.webkitGetUserMedia || navigator.mozGetUserMedia;

  //now we get the video feed and audio feed form our webcam!
  navigator.getUserMedia({video: true, audio:true}, function(stream){
    document.getElementById('my_video').src = window.URL.createObjectURL(stream) || stream;

    document.getElementById('my_video').play();
  }, function(err){
    console.log(err);
  });
}


//code to receive data
peer.on('connection', function(current_connection){
  console.log("connected: "+current_connection.peerConnection.name);

  current_connection.on('data', function(data){
    document.getElementById("messages-received").innerHTML += data;
  });
});

function connectToPeer(){//this is where we initiate the connection
  var peer_to_connect_to = document.getElementById('peer').value;

  my_connection = peer.connect(peer_to_connect_to);
  console.log(my_connection);
}


function sendMessage(){
  var message_to_send = document.getElementById('message').value;

  my_connection.send(message_to_send);
}
