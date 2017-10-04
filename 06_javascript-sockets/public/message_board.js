var socket = io.connect("http://10.225.32.152");

socket.on('open', function(){
  console.log('connected');
});

socket.on('update', function(data){
  document.getElementById("message-board").innerHTML += data.greet;
  
  console.log(data);
  
  for(var i = 0; i < data.messages.length; i++){
    document.getElementById("message-board").innerHTML += data.messages[i];
  }
});

socket.on('send-back-message', function(data){
  document.getElementById("message-board").innerText += data;
});

socket.on('image', function(data){
  document.getElementById('imagefile').src = data;
});

function sendRandomStuff(msg){
  
  console.log('sending',msg);
  
  socket.emit('message', msg);
}


function sendMessage(){
  var msg = document.getElementById("input-field").value;
  
  socket.emit('message', msg);
}

var initWebRTC = function() {

  // These help with cross-browser functionality
  window.URL = window.URL || window.webkitURL || window.mozURL || window.msURL;
  navigator.getUserMedia = navigator.getUserMedia || navigator.webkitGetUserMedia || navigator.mozGetUserMedia || navigator.msGetUserMedia;
  
  // The video element on the page to display the webcam
  var video = document.getElementById('thevideo');

  // if we have the method
  if (navigator.getUserMedia) {
    navigator.getUserMedia({video: true}, function(stream) {
        video.src = window.URL.createObjectURL(stream) || stream;
        video.play();
        // video.style.visibility = "hidden";
      }, function(error) {alert("Failure " + error.code);});
  }
        
  var thecanvas = document.getElementById('thecanvas');
  var thecontext = thecanvas.getContext('2d');
    
    var draw = function() {
      console.log('drawing');
      thecontext.drawImage(video,0,0,640, 480);
      var dataUrl = thecanvas.toDataURL('image/webp', 1);
      document.getElementById('imagefile').src = dataUrl;
      socket.emit('image', dataUrl);
      setTimeout(draw,3000);
    };

    if(true)
      draw();			
};
