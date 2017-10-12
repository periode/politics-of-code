var Twit = require('twit');

var t = new Twit({
  consumer_key : 'kij47kAvvt6tPIVit99ATR3kq',
  consumer_secret: 'yirA83ukpyt0QstxtJhIFnLzVU5xbOFWVXe7Q2oTlyGtdwLBpW',
  access_token: '408032569-GGR6Hba7RAbeFJx5CE7jKAYZ4BiXNhVmQmNGQGGj',
  access_token_secret: 'GpuKie9Asor6uAf9XImhFqjUDvCcRH2GxOkcfPNbuOyzX',
  timeout_ms: 60*1000 //we ensure a timeout of one minute after a HTTP request has failed
});

var listed_users = [];

t.get('search/tweets', {q: 'pope clinton', count: 100}, function(err, data, response){
  for(var i = 0; i < data.statuses.length; i++){
    console.log(data.statuses[i].text);
    console.log(data.statuses[i].user.followers_count);
    console.log('------------------');
  }
  // var found_user = {};
  // for(var result in data.statuses){
  //   console.log('-----------------------------------------');
  //   // console.log(data.statuses[result].user.name);
  //   // console.log(data.statuses[result].user.id);
  //   // console.log(data.statuses[result].text);
  //
  //   found_user.username = data.statuses[result].user.name;
  //   found_user.userid = data.statuses[result].user.id;
  //
  //   console.log(found_user);
  //
  //   listed_users.push(found_user);
  // }
});
