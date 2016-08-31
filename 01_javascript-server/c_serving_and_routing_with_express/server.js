//instead of requiring servi, we are going to require express, a more powerful framework
var express = require('express');

//in additon, we are going to require 'http', which will work in conjunction with express
var http = require('http');

//finally, we are also going to require 'path'
//path is a module which allows us to make sure the paths to our folders and files are valid
var path = require('path');

//here we instantiate our server
var app = express();

//here we set the port on which our app is going to listen
app.set('port', 8080);

//this is the equivalent of "serveFiles" in servi
app.use(express.static(path.join(__dirname, 'public')));

http.createServer(app)//here we tell the http module to start our server, using our express app
  .listen(app.get('port'), //and we specify the port on which to listen
  function(){ //and we provide a callback function once the action is done
    console.log('the server is now up and running on port',app.get('port')); //which is only going to print a message to our console
  });



//this is where we set-up our routes
app.get('/blog', serveBlog);

function serveBlog(req, res, err){

  //when you send back a file, you have to specify the directory name, so we pass some options to the function sendFile
  res.sendFile('blog.html', {root: __dirname + '/public/'});

  //or we can do it that way
  //res.sendFile(path.join(__dirname, './public', 'blog.html'));
}

app.get('/redirect/:loc', function(req, res, err){
  console.log(req.params.loc);
  res.send('access a link at <a href="../'+req.params.loc+'.html">this location</a>');
});
