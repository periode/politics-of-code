//instead of requiring servi, we are going to require express, a more powerful framework
var express = require('express');

//in additon, we are going to require 'http', which will work in conjunction with express
var http = require('http');

//finally, we are also going to require 'path'
//path is a module which allows us to make sure the paths to our folders and files are valid
var path = require('path');

//here we require fs, a basic (as in 'essential') module to read and write files/directories from the server
var fs = require('fs');

//here we instantiate our server
var app = express();

var time = new Date(); //we instantiate a new Date() object, cause it's always useful to have the time :)

//here we set the port on which our app is going to listen
app.set('port', 8080);

//here we set our templating engine
app.set('view engine', 'jade');
//setting where the templates live
app.set('views', 'public/views');

//this is the equivalent of "serveFiles" in servi
app.use(express.static(path.join(__dirname, 'public')));

http.createServer(app)//here we tell the http module to start our server, using our express app
  .listen(app.get('port'), //and we specify the port on which to listen
  function(){ //and we provide a callback function once the action is done
    console.log('the server is now up and running on port',app.get('port')); //which is only going to print a message to our console
  });

app.get('/responses/:title', function(req, res, err){

  //now we're about to render a template by filling it with a bunch of dynamic content
  //this dynamic content is going to be set through a JSON object, which we're going to give to the response, along with the name of the template we want to render

  //so we start by creating our empty object
  var content = {
    title:'',
    text:'',
    date:''
  };

  //the title is going to be fetched directly from the url
  //so that, if someone requests "http://mywebsite.com/reading/week1", the title will be "week1"
  content.title = req.params.title;

  //here we use the fs module to read contents of a file, which is going to have the same name as our title ("./public/responses/week1.txt")
  content.text = fs.readFileSync('./public/responses/'+req.params.title+'.txt', 'utf8');

  //and finally we use our date object to get the current date, so we don't have to hard-coded in our html and change our it everyday :p
  //the .toString() method in JavaScript just makes sure that whatever we're referencing is, well, a string.
  content.date = "today's date is: "+time.getUTCDate().toString()+"/"+(time.getMonth()+1).toString()+"/"+time.getFullYear().toString();

  //now we have all of our content, and we send it to the client, along with the template.
  //upon arrival, they will merge into one beautiful webpage
  res.render('response.jade', content);
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
