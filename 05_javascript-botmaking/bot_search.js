var Twit = require('twit');

var t = new Twit({
  consumer_key : 'kij47kAvvt6tPIVit99ATR3kq',
  consumer_secret: 'yirA83ukpyt0QstxtJhIFnLzVU5xbOFWVXe7Q2oTlyGtdwLBpW',
  access_token: '408032569-GGR6Hba7RAbeFJx5CE7jKAYZ4BiXNhVmQmNGQGGj',
  access_token_secret: 'GpuKie9Asor6uAf9XImhFqjUDvCcRH2GxOkcfPNbuOyzX',
  timeout_ms: 60*1000 //we ensure a timeout of one minute after a HTTP request has failed
});


  t.get('search/tweets', {q: 'france', count: 10}, function(err, data, response){
    console.log(data.statuses[0]);

    // for(var i = 0; i < data.statuses.length; i++){
    //   console.log('tweet #'+i+' >'+data.statuses[i].text);
    // }
  });
