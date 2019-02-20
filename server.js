// server.js
// where your node app starts

// init project
var express = require('express');
var app = express();

// http://expressjs.com/en/starter/static-files.html
app.use(express.static('public'));

// http://expressjs.com/en/starter/basic-routing.html
app.get("/", function (request, response) {
  response.sendFile(__dirname + '/views/index.html');
});


//-------------------------------------------------------------//
//----------------------- AUTHORIZATION -----------------------//
//-------------------------------------------------------------//


// Initialize Spotify API wrapper
var SpotifyWebApi = require('spotify-web-api-node');

// The object we'll use to interact with the API
var spotifyApi = new SpotifyWebApi({
  clientId : process.env.CLIENT_ID,
  clientSecret : process.env.CLIENT_SECRET
});

// Using the Client Credentials auth flow, authenticate our app
spotifyApi.clientCredentialsGrant()
  .then(function(data) {
  
    // Save the access token so that it's used in future calls
    spotifyApi.setAccessToken(data.body['access_token']);
    console.log('Got an access token: ' + spotifyApi.getAccessToken());
  
  }, function(err) {
    console.log('Something went wrong when retrieving an access token', err.message);
  });


//-------------------------------------------------------------//
//------------------------- API CALLS -------------------------//
//-------------------------------------------------------------//


app.get('/search-track', function (request, response) {
  // Build a collection of tracks
  let tracks = [{name:"proud of u"}, {name:"bartender"}];
    // Get the data
  tracks.forEach((track) => {
    spotifyApi.searchTracks(`track:${track.name}`, {limit: 1})
      .then((data) => {
        // Persist the data on this  object
        track.data = data.body;
    }, function(err) {
      console.error(err);
    });
  });
  
  let check = () => {
    if (tracks.filter(track => track.data !== undefined).length 
    !== tracks.length) {
      setTimeout(check, 500);
    } else {
      response.send(tracks);
    }
  }
  
  // Call check so we don't send a response until we have all the data back
  check();
  
});

app.get('/category-playlists', function (request, response) {
  
  // Make an initial list of countries
  let countries = [
    {
      name: "Sweden",
      code: "SE"
    },
    {
      name: "France",
      code: "FR"
    },
  ];
  
  
  // Get the playlists for the given category for each country
  countries.forEach((c) => {
    spotifyApi.getPlaylistsForCategory(
      'jazz', 
      { country: c.code, limit : 10 }
    )
      .then((data) => {
        // Persist the data on this country object
        c.data = data.body;
    }, function(err) {
      console.error(err);
    });
  });
  
  let check = () => {
    if (countries.filter(c => c.data !== undefined).length 
    !== countries.length) {
      setTimeout(check, 500);
    } else {
      response.send(countries);
    }
  }
  
  // Call check so we don't send a response until we have all the data back
  check();
});

app.get('/audio-features', function (request, response) {
  
  // Build a collection of tracks
  let tracks = [{id:"4uLU6hMCjMI75M1A2tKUQC",name:"Never Gonna Give You Up"}, 
                 {id:"250RLekaiL1q9qZer975Eg", name:"If We Were Vampires"}];
    // Get data
  tracks.forEach((track) => {
    spotifyApi.getAudioFeaturesForTrack(`${track.id}`)
      .then((data) => {
        // Persist the data on this  object
        track.data = data.body;
    }, function(err) {
      console.error(err);
    });
  });
  
  let check = () => {
    if (tracks.filter(track => track.data !== undefined).length 
    !== tracks.length) {
      setTimeout(check, 500);
    } else {
      response.send(tracks);
    }
  }
  
  // Call check so we don't send a response until we have all the data back
  check();
});

app.get('/artist', function (request, response) {
  
  // Build a collection of artists
  let artists = [{id:"6jJ0s89eD6GaHleKKya26X"}, 
                 {id:"1EowJ1WwkMzkCkRomFhui7"}];
    // Get data
  artists.forEach((artist) => {
    spotifyApi.getArtist(`${artist.id}`)
      .then((data) => {
        // Persist the data on this  object
        artist.data = data.body;
    }, function(err) {
      console.error(err);
    });
  });
  
  let check = () => {
    if (artists.filter(track => track.data !== undefined).length 
    !== artists.length) {
      setTimeout(check, 500);
    } else {
      response.send(artists);
    }
  }
  
  // Call check so we don't send a response until we have all the data back
  check();
});

app.get('/artist-top-tracks', function (request, response) {
   
  // Build a collection of artists
  let artists = [{id:"0LcJLqbBmaGUft1e9Mm8HV",country:"SE"}, 
                 {id:"1EowJ1WwkMzkCkRomFhui7",country:"JP"}];
    // Get data
  artists.forEach((artist) => {
    spotifyApi.getArtistTopTracks(`${artist.id}`, `${artist.country}`)
      .then((data) => {
        // Persist the data on this  object
        artist.data = data.body;
    }, function(err) {
      console.error(err);
    });
  });
  
  let check = () => {
    if (artists.filter(track => track.data !== undefined).length 
    !== artists.length) {
      setTimeout(check, 500);
    } else {
      response.send(artists);
    }
  }
  
  // Call check so we don't send a response until we have all the data back
  check();
});


//-------------------------------------------------------------//
//------------------------ WEB SERVER -------------------------//
//-------------------------------------------------------------//


// Listen for requests to our app
// We make these requests from client.js
var listener = app.listen(process.env.PORT, function () {
  console.log('Your app is listening on port ' + listener.address().port);
});
