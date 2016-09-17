var express = require('express');
var http = require('http');
var path = require('path');

var app;

app = new express();

app.set('port', 8080);

app.use(express.static(path.join(__dirname, 'public')));

http.createServer(app).listen(app.get('port'), function(){
  console.log('server started on port', app.get('port'));
});


app.get('/form', function(req, res, err){
  //declaring
  var username;
  var religion;


  username = req.query.user_name;
  religion = req.query.user_religion;

  res.write('<h1>title</h1><br><br>');
  res.write("<p>dear, "+username+" you are not eligible</p>");
  res.end();
});
