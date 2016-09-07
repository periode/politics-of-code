var express = require('express');
var http = require('http');
var path = require('path');
var bodyParser = require('body-parser');

//we require fs as a module to read and write to the filesystem
//(i.e. the files on the same machine as out server script)
var fs = require('fs');

var app = new express();
app.set('port', 8080);

app.use(express.static(path.join(__dirname, 'public')));
app.use(bodyParser.urlencoded({
  extended: true
}));
app.use(bodyParser.json());

http.createServer(app).listen(app.get('port'), function(){
  console.log('server started on port', app.get('port'));

  //once we've started our server, we want to make sure a database exists.
  //if not, we will create one
  setupDatabase();
});


function setupDatabase(){
  console.log('checking for database...');
  try{//the try/catch syntax allows us to test for errors without crashing our program

    //we try to open the file where it should be
    fs.accessSync('public/data/profiles.json');

    //if line 32 doesn't throw an error, we print a message to the console, saying that all is well
    console.log('...database exists!');

  }catch(e){//if there is indeed an error, we catch it here and we create our database
    console.log('...couldn\'t find database...');
    var obj = {"profiles":[]};//our default structure is going to be a JSON object

    //we write that object to a file (which will also create the file if it doesn't exist)
    //we can't actually write JSON objects, so we stringify it when we pass it to the function
    fs.writeFile('public/data/profiles.json', JSON.stringify(obj), function(err){
      if(err){//if there's an error while writing to the file, well... we throw the error
        throw err;
      }else{//otherwise it's a great success, and we confirm it:
        console.log('...successfully created database');
      }
    });
  }
}

//this is where we get our new data
app.post('/form', function(req, res, err){
  //the data that the user has input is in the request's body, so we store it in a variable
  //it's already in the JSON format
  var new_profile = req.body;

  //we get the contents of our existing database
  var profiles_string = fs.readFileSync('public/data/profiles.json');

  //since it was written as a string, we parse it as JSON first, so that we can manipulate it later
  var profiles_object = JSON.parse(profiles_string);

  //we know that in our object there is a "profiles" array, so we push our new profile to that array
  profiles_object.profiles.push(new_profile);

  //and again, we write the extended array to the same file
  fs.writeFile('public/data/profiles.json', JSON.stringify(profiles_object), function(err){
    if(err)
      throw err;
    else
      console.log('added new profile to the database');
  });

  //and we tell something to the user at the end!
  res.send('form submitted!');
});
