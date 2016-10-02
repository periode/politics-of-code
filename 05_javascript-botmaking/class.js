var Twit = require('twit');

var options = {
  consumer_key : 'kij47kAvvt6tPIVit99ATR3kq',
  consumer_secret: 'yirA83ukpyt0QstxtJhIFnLzVU5xbOFWVXe7Q2oTlyGtdwLBpW',
  access_token: '408032569-GGR6Hba7RAbeFJx5CE7jKAYZ4BiXNhVmQmNGQGGj',
  access_token_secret: 'GpuKie9Asor6uAf9XImhFqjUDvCcRH2GxOkcfPNbuOyzX',
  timeout_ms: 60*1000
}

var bot = new Twit(options);

var all_tweets_about_love = [];

bot.get('search/tweets', {q: '"terrorism"', count: 100}, function(error, data, response){
  // console.log(data);


  for(var i = 0; i < data.statuses.length; i++){
    // console.log('name: '+data.statuses[i].user.screen_name);
    // console.log('id: '+data.statuses[i].user.id);
    // console.log('text:'+data.statuses[i].text);
    var new_tweet = {}
    new_tweet.name = data.statuses[i].user.screen_name;
    new_tweet.id = data.statuses[i].user.id;
    new_tweet.text = data.statuses[i].text;

    all_tweets_about_love.push(new_tweet);
  }

  console.log(all_tweets_about_love);
});
