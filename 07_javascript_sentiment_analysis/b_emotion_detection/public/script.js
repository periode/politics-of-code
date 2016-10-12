var videoInput;
var tracker;

var canvasInput;
var canvasContext;

var emotion_class = new emotionClassifier();
var emotion_data;

function init(){

  videoInput = document.getElementById('the-video');

  canvasInput = document.getElementById('the-canvas');
  canvasContext = canvasInput.getContext('2d');

  //start the camera
  navigator.getUserMedia = navigator.getUserMedia || navigator.webkitGetUserMedia || navigator.mozGetUserMedia;
  window.URL = window.URL || window.webkitURL || window.mozURL || window.msURL;

  navigator.getUserMedia({video: true, audio: false}, function(stream){
    videoInput.src = window.URL.createObjectURL(stream) || stream;
    videoInput.play();
  }, function(err){
    console.log(err);
  });

  //start the tracker
  tracker = new clm.tracker({webGL: true});
  tracker.init(pModel);
  tracker.start(videoInput);

  drawTracker();

	emotion_class.init(emotionModel);
	emotion_data = emotion_class.getBlank();
}

function drawTracker(){
  requestAnimationFrame(drawTracker);
  canvasContext.clearRect(0, 0, canvasInput.width, canvasInput.height);
  tracker.draw(canvasInput);

  var current_parameters = tracker.getCurrentParameters();
  var emotions_estimate = emotion_class.meanPredict(current_parameters);

  // console.log('---------------');
  // console.log('er:',er[0]);
  // console.log('er:',er[1]);
  // console.log('er:',er[2]);

  // console.log('current emotion:',getCurrentEmotion(emotions_estimate));
  getCurrentEmotion(emotions_estimate);
}

function getCurrentEmotion(_emotions){
  var highest_value = -1000;
  var current_highest_emotion = 0;

  for(var i = 0; i < _emotions.length; i++){
    // if(_emotions[i].value > highest_value){
    //   highest_value = _emotions[i].value;
    //   current_highest_emotion = i;
    // }
    document.getElementById(_emotions[i].emotion).innerHTML = _emotions[i].emotion + ': ' + _emotions[i].value;
  }


  return _emotions[current_highest_emotion];
}
