var express = require('express');
var http = require('http');
var path = require('path');

var app = new express();
app.set('port', 8080);

app.use(express.static(path.join(__dirname, 'public')));

http.createServer(app).listen(app.get('port'), function(){
  console.log('server started on port', app.get('port'));
});

app.get('/form', function(req, res, err){
  console.log('name',req.query.user_name);
  console.log('religion',req.query.user_religion);
  res.send('form submitted!');
});
