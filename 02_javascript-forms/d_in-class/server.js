var express = require('express'); 
var app = express();
var port = 8000;
var bp = require('body-parser');
var fs = require('fs');

app.use(express.static('public'));

// parse application/x-www-form-urlencoded
app.use(bp.urlencoded({ extended: true }));
// parse application/json
app.use(bp.json());

app.listen(port, function(){
  console.log('server started on port',port);
});

//this is called a route
//this specific route is for the endpoint submit
app.get("/submit", function(request, response, error){
  console.log(request);
  
  if(request.query.user_religion == 'none'){
    response.send('you cannot be president of the united states');
  }else{
    response.send('get a us citizenship (if you care enough)');
  }
});

app.post("/submit", function (request, response, error){
  console.log('-----');
  console.log('input', request.body);
  
  var user = {};
  user.name = request.body.user_name;
  user.happiness = 'undefined';
  console.log('----------');
  console.log('output', user);

  //first we read our file that is in the 'data' folder, and our file is called 'users.json'
  fs.readFile('./data/users.json', function(error, data){
    var whole_file = JSON.parse(data); //once we have the data, we parse it as JSON (because it's just text)
    
    //then we add our newly registered user to our array called "all users"
    //(check the users.json file to see that it's the top level array!)
    whole_file.all_users.push(user);
    
    //then we write ALL of our data (in the variable 'whole_file')
    fs.writeFile('./data/users.json', JSON.stringify(whole_file), function(error){
      if(error){ //hopefully no error?
        console.log(error);
      }else{//success message!
        console.log('success! written new user',user);  
      }
    });
  });

  response.send('thank you');
});


app.get("/get-users", function(req, res, err){
  fs.readFile("./data/users.json", function(err, data){
    var obj = JSON.parse(data);
    
    res.json(obj);
  });
});













