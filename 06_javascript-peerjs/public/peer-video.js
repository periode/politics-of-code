//peer is our peer connection
var peer;

//call is the specific call we are going to make
var call;

//these are the HTML video elements that are going to display our a/v streams
var video_elem_other;
var video_elem_self;

var my_stream;

var api_key = 'c83xx8lhssoo5hfr';

function init(){
  // //this is where we connect to a custom peerServer
  // peer = new Peer(my_peer_id, {host: 'localhost', port: 2046, path: '/peer'});

  //this is where we connect to a server hosted by peerJS - go to http://peerjs.com/peerserver to get an api key
  peer = new Peer(my_peer_id, {key: api_key});

  //sanity check to make sure we're connected :)
  console.log('connected', peer);

  //this is where we get a reference to the two video elements on our HTML page: our own video, and the other video.
  video_elem_other = document.getElementById('video-holder-other');
  video_elem_self = document.getElementById('video-holder-self');

  //these two lines allow for cross-browser compatibility -things don't have the same name depending on whether you use chrome, safari, mozilla, etc.
  window.URL = window.URL || window.webkitURL || window.mozURL || window.msURL;
  navigator.getUserMedia = navigator.getUserMedia || navigator.webkitGetUserMedia || navigator.mozGetUserMedia;

  //getUserMedia is basically our webcam + microphone
  //now that we have it, we want to do something with the stream: display it
  navigator.getUserMedia({video: true, audio: true}, function(stream) {

    my_stream = stream;

    //we set the source of the video tag that we reserved for or own stream
    video_elem_self.src = window.URL.createObjectURL(my_stream) || my_stream;
    //let's not forget to play it!
    video_elem_self.play();

    //now that we have displayed our video, we set up an event listener on our peer connection
    //for whenever we receive a call
    peer.on('call', function(incoming_call) {
      //we answer the call with our own stream (cause we're polite)
      incoming_call.answer(my_stream);

      //whenever we get the a/v stream from the incoming call, we want to display it on our page
      incoming_call.on('stream', function(remoteStream) {
        //we set it as the source of the video tag we reserved for the other stream
        video_elem_other.src = window.URL.createObjectURL(remoteStream) || remoteStreamstream;
        //let's not forget to play it!
        video_elem_other.setAttribute("autoplay", "true");
        video_elem_other.play();
      });
    });
  }, function(err) {
    //there are always possible errors :(
    console.log('Failed to get local stream' ,err);
  });

}

//this is the function we call when we want to make a call with the id of the peer we want to connect to
function connect(){
  //get the id of the peer from the text input field
  var id = document.getElementById('peer-id').value;

  //cross-browser compatibility
  window.URL = window.URL || window.webkitURL || window.mozURL || window.msURL;
  navigator.getUserMedia = navigator.getUserMedia || navigator.webkitGetUserMedia || navigator.mozGetUserMedia;

  //we get our media, then we get our stream
  navigator.getUserMedia({video: true, audio:true}, function(stream){

    //let's make a call to the id we've gotten from the text input, and pass our a/v stream along with that call!
    call = peer.call(id, stream);

    //whenever we get a strem, let's display the remote stream!
    call.on('stream', function(remoteStream){
      video_elem_other.src = window.URL.createObjectURL(stream) || stream;
      video_elem_other.setAttribute("autoplay", "true");
      video_elem_other.play();
    });
  }, function(err){
    //as usual, anticipate for errors :/
    console.log('failed to get stream',err);
  });
}
