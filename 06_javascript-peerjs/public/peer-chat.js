var peer;
var link;
var status_elem;
var data_elem;

var api_key = 'c83xx8lhssoo5hfr';

function init(){
  //this is where we connect to a custom peerServer
  // peer = new Peer(my_peer_id, {host: 'localhost', port: 2046, path: '/peer'});

  //this is where we connect to a server hosted by peerJS - go to http://peerjs.com/peerserver to get an api key
  peer = new Peer(my_peer_id, {key: api_key});

  //sanity check: do we have a connection?
  console.log('connected', peer);

  //we get a reference to the HTML elements to display the status of our connection, and the messages received
  status_elem = document.getElementById('status');
  data_elem = document.getElementById('data-holder');

  //we change our status
  status_elem.innerHTML = 'status: connected to server';

  //now that we have a peer, we add an event listener for when we connect
  peer.on('connection', function(connect){

    //within that event listener, we add another one >> when we are connected, we listen for 'data' objects
    connect.on('data', function(data){

      //now we set the innerHTML of the data-holder element
      data_elem.innerHTML = data;
    });
  });
}

//this function is called when we click on the CONNECT button
function connect(){
  //first, we get the id of the peer we want to connect to from the text input field
  var id = document.getElementById('peer-id').value;

  //then, we actually create a connection to that peer
  link = peer.connect(id);

  //update the status div
  status_elem.innerHTML = 'status: connecting to '+id+'...';

  //we set up an event listener for completion, which tells that we've indeed connected
  link.on('open', function(){
    status_elem.innerHTML = 'status: opened connection to '+id;
  });
}

//this function is called when we click on the SEND button
function send(){
  //first, we get the message
  var msg = document.getElementById('peer-msg').value;

  //then, we send the message through the link
  link.send(msg);
}
