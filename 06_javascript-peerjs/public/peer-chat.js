var peer;
var conn;
var status_elem;
var data_elem;

var api_key = 'c83xx8lhssoo5hfr';

function init(){
  //this is where we connect to a custom peerServer
  // peer = new Peer(my_peer_id, {host: 'localhost', port: 2046, path: '/peer'});

  //this is where we connect to a server hosted by peerJS - go to http://peerjs.com/peerserver to get an api key
  peer = new Peer(my_peer_id, {key: api_key});
  // peer = new Peer(my_peer_id, {host: '127.0.0.1', port: 2046, path:'/peer', debug:3});

  //we get a reference to the HTML elements to display the status of our connection, and the messages received
  status_elem = document.getElementById('status');
  data_elem = document.getElementById('data-holder');

  //now that we have a peer, we add an event listener for when we connect
  peer.on('open', function(id){
    console.log(peer.id);
    status_elem.innerHTML = 'status: connected to server';
    
    
    peer.on('connection', function(dataConnection){
      console.log('received connection');
          
      dataConnection.on('open', function(data){
        //now we set the innerHTML of the data-holder element
        console.log('oppppened');
      });
      
      dataConnection.on('data', function(data){
        //now we set the innerHTML of the data-holder element
        data_elem.innerHTML = data;
      });
    });
  });
  
  peer.on('error', function(err){
    console.log(err);
  });
}

//this function is called when we click on the CONNECT button
function connect(){
  //first, we get the id of the peer we want to connect to from the text input field
  var id = document.getElementById('peer-id').value;

  //then, we actually create a connection to that peer
  var conn = peer.connect(id);

  //update the status div
  status_elem.innerHTML = 'status: connecting to '+id+'...';
  
  conn.on('error', function(err){
    console.log(err);
  });

  //we set up an event listener for completion, which tells that we've indeed connected
  conn.on('open', function(){
    console.log('connected');
    status_elem.innerHTML = 'status: opened connection to '+id;
    
    conn.send('hey');
  });
  
  conn.on('data', function(data){

    //now we set the innerHTML of the data-holder element
    data_elem.innerHTML = data;
  });
  
  
  
  conn.on('close', function(){
    console.log('closed');
  })
  
  
}

//this function is called when we click on the SEND button
function send(){
  //first, we get the message
  var msg = document.getElementById('peer-msg').value;

  //then, we send the message through the conn
  conn.send(msg);
}
