var express = require('express');
var http = require('http');
var path = require('path');

var mongoose = require('mongoose');

var app = new express();
var port = 8000;

app.use(express.static(path.join(__dirname, 'public')));

app.listen(port, function(){
  console.log('server started on port', port);
});

//we connect to the database. "test" here refers to the specific database that we want to connect to
mongoose.connect('mongodb://localhost/test');

var my_database = mongoose.connection;

//we can attach "listeners" to our database connection.
//which means that we attach a callback function to an event
//and that function is called whenever the event happens

//in case there's an 'error' event, we log it to the console
my_database.on('error', console.error.bind(console, 'connection error:'));

//if you always get an error, make sure you mongodb is running, and not just installed!

//in case of an 'open' event, we say that we've successfully opened our connection.
//we can also do other things like check for existing data, etc.

var Song;

my_database.on('open', function(){
  console.log("connections to the database successful!");


  var songSchema = mongoose.Schema({
    title: String,
    artist: String,
    URL: String
  });

  Song = mongoose.model('Song', songSchema);

  //----------------------------UNCOMMENT THIS PART TO SAVE A SONG EVERYTIME
  // var my_song = new Song({
  //   title: 'Nothing Can Come Between Us',
  //   artist: 'Sade',
  //   URL: 'https://www.youtube.com/watch?v=_oVI0GW-Xd4'
  // });
  //
  // my_song.save(function(err, my_song){
  //   if(err){
  //     return console.error(err);
  //   }else{
  //     console.log('successfully saved new song: '+my_song.title);
  //   }
  //});

  Song.find(function(err, all_songs){
    console.log(all_songs);
  });
});



app.get('/save', function(req, res, err){
  console.log(req.query);

  //we create a new Song Model with the info we got from the user
  var new_song = new Song({
    title: req.query.song_title,
    artist: req.query.song_artist,
    url: req.query.song_url
  });

  //we save it to our database
  new_song.save(function(err, new_song){
    if(err){
      return console.error(err);
    }else{
      console.log('successfully saved new song: '+new_song.title);
    }
  });

  res.send('successful save!<br><a href="index.html">back</a>');
});

app.get('/list', function(req, res, err){
  Song.find(function(err, all_songs){
    res.write('<h1>list of all songs saved</h1>');
    for(var i = 0; i < all_songs.length; i++){
      res.write(all_songs[i].toString()+"<br><hr><br>");
    }
    res.write('<br><br>');
    res.write('that\'s it!');
    res.end();
  });
});

app.get('/deleteAll', function(req, res, err){
  Song.remove(function(err){
    if(err){
      return  console.log(err);
    }else {
      console.log('wiped out all database');
      res.send("all is gone");
    }
  });
});
