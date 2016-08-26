var servi = require('servi');
var app = new servi(true);

port(8080);

serveFiles('public');

route('/blog', function(request, response, error){
  request.serveFile('public/blog.html');
});

start();
