var Twit = require('twit');

var t = new Twit({
  consumer_key : 'kij47kAvvt6tPIVit99ATR3kq',
  consumer_secret: 'yirA83ukpyt0QstxtJhIFnLzVU5xbOFWVXe7Q2oTlyGtdwLBpW',
  access_token: '408032569-GGR6Hba7RAbeFJx5CE7jKAYZ4BiXNhVmQmNGQGGj',
  access_token_secret: 'GpuKie9Asor6uAf9XImhFqjUDvCcRH2GxOkcfPNbuOyzX',
  timeout_ms: 60*1000 //we ensure a timeout of one minute after a HTTP request has failed
});

var stream = t.stream('statuses/filter', {track: 'terrorism'});

stream.on('tweet', function(tweet){
  console.log(tweet.user.name);
  console.log(tweet.id);
  console.log(tweet.text);
// console.log(tweet);
console.log('---------');
});
