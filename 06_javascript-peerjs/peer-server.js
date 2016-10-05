var express = require('express');
var path = require('path');
var app = express();

var ExpressPeerServer = require('peer').ExpressPeerServer;

app.use(express.static(path.join(__dirname, 'public')));

app.get('/', function(req, res, err){
  res.send('hello world!');
});

var server = app.listen(2046);

var options = {
  debug: true
}

app.use('/peer', ExpressPeerServer(server, options));

// server.on('connection', function(id){
//   console.log('connection with id #'+id);
// });

// server.on('disconnect', function(id){
//   console.log('disconnection with id #'+id);
// });
