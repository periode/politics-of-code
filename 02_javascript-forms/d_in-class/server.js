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
  console.log('input', request.body);
  
  var user = {};
  user.name = request.body.user_name;
  user.happiness = 'undefined';
  console.log('----------');
  console.log('output', user);

  
  fs.readFile('./data/users.json', function(error, data){
    var file = JSON.parse(data);
    
    console.log(data);
    file.all_users.push(user);
    
    fs.writeFile('./data/users.json', JSON.stringify(all_users), function(error){
      
      if(error){
        console.log(error);
      }else{
        console.log('success! written new user',user);  
      }
      
    });
  });

  
  
  
  response.send('thank you');
});




