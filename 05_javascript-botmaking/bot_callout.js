var Twit = require('twit');

var t = new Twit({
  consumer_key : 'kij47kAvvt6tPIVit99ATR3kq',
  consumer_secret: 'yirA83ukpyt0QstxtJhIFnLzVU5xbOFWVXe7Q2oTlyGtdwLBpW',
  access_token: '408032569-GGR6Hba7RAbeFJx5CE7jKAYZ4BiXNhVmQmNGQGGj',
  access_token_secret: 'GpuKie9Asor6uAf9XImhFqjUDvCcRH2GxOkcfPNbuOyzX',
  timeout_ms: 60*1000 //we ensure a timeout of one minute after a HTTP request has failed
});

var listed_users = [];

t.get('search/tweets', {q: 'france since:2016-09-26', count: 100}, function(err, data, response){
  var found_user = {};
  for(var result in data.statuses){
    found_user.username = data.statuses[result].user.name;
    found_user.status_id = data.statuses[result].user.id;

    listed_users.push(found_user);
  }

  calloutUsers();
});

function calloutUsers(){
  console.log(listed_users[3]);
  t.post('statuses/update', {status: 'hey @'+listed_users[3].username, in_reply_to_status_id: listed_users[3].status_id}, function(err, data, response){
    if(err)
      console.log(err);
    else
      console.log('tweeted');
  });
}
