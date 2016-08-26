//this line checks that we have the correct node module installed
var servi = require('servi');

//this line instantiates a new server
var app = new servi(true);

//this sets the port on which we will be able to connect
//80 is the default port to connect to the internet
//ports between 0 and 1024 are registered ports for specific use
//so for development, we usually use ports above 1024
port(8080);

//this line tells our server to serve whatever files are inside our 'public' folder by default
//it will look by default for a file called 'index.html' in the specified folder and serve that file
serveFiles('public');

//start our server!
start();
