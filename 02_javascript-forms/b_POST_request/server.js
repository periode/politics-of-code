var express = require('express');
var http = require('http');
var bp = require('body-parser');

var app = new express();
app.set('port', 8080);

app.use(express.static('public'));
app.use(bp.urlencoded({
  extended: true
}));
app.use(bp.json());

http.createServer(app).listen(app.get('port'), function(){
  console.log('server started on port', app.get('port'));
});

app.post('/form', function(req, res, err){
  console.log(req.body);
  res.send('form submitted!');
});
