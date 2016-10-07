var videoInput;
var tracker;

var canvasInput;
var canvasContext;

function init(){

  videoInput = document.getElementById('the-video');

  canvasInput = document.getElementById('the-canvas');
  canvasContext = canvasInput.getContext('2d');

  //start the camera
  navigator.getUserMedia = navigator.getUserMedia || navigator.webkitGetUserMedia || navigator.mozGetUserMedia;
  window.URL = window.URL || window.webkitURL || window.mozURL || window.msURL;

  navigator.getUserMedia({video: true, audio: true}, function(stream){
    videoInput.src = window.URL.createObjectURL(stream) || stream;
    videoInput.play();
  }, function(err){
    console.log(err);
  });

  //start the tracker
  tracker = new clm.tracker();
  tracker.init(pModel);
  tracker.start(videoInput);

  drawTracker();
}

function drawTracker(){
  requestAnimationFrame(drawTracker);
  canvasContext.clearRect(0, 0, canvasInput.width, canvasInput.height);
  tracker.draw(canvasInput);
}
