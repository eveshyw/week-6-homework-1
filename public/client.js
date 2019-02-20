// client-side js
// run by the browser each time your view template is loaded

document.addEventListener('DOMContentLoaded',function() {
    
  fetch('/search-track').then(resp => resp.json()).then((data) => {
    // "Data" is the object we get from the API. See server.js for the function that returns it.
    console.group('%cResponse from /search-track', 'color: #F037A5; font-size: large');
    console.log(data);
    console.groupEnd();
    
    // Display the track name
    const searchTrackContainer = document.getElementById("search-track-container");
    searchTrackContainer.insertAdjacentHTML('beforeend', `<h3><a href="${data.external_urls.spotify}">${data.name}</a></h3>`);
    
    // Display the artist name
    var artists = '';
    
    data.artists.forEach(function(item) {
      artists = artists + item.name + ' ';
    });
    
    let h5 = document.createElement('h5');
    h5.innerText = artists;
    searchTrackContainer.append(h5);
    
    // Display the album art
    searchTrackContainer.insertAdjacentHTML('beforeend', `<img src="${data.album.images[0].url}"/>`);
  });
  
  fetch('/category-playlists').then(resp => resp.json()).then((data) => {
    // "Data" is the object we get from the API. See server.js for the function that returns it.
    console.group('%cResponse from /category-playlists', 'color: #F037A5; font-size: large');
    console.log(data);
    console.groupEnd();
    
    const categoryPlaylistsContainer = document.getElementById("category-playlists-container");
    
    // Display the covers of the playlists
    data
      .forEach((c) => {
        categoryPlaylistsContainer.insertAdjacentHTML('beforeend', `<br><h1>${c.name}</h1><br>`);
        c.data.playlists.items.map(function(playlist, i) {
          categoryPlaylistsContainer.insertAdjacentHTML('beforeend', `<img class="cover-image" src="${playlist.images[0].url}"/>`);
        });
      })
  });
  
  fetch('/audio-features').then(resp => resp.json()).then((data) => {
    // "Data" is the object we get from the API. See server.js for the function that returns it.
    console.group('%cResponse from /audio-features', 'color: #F037A5; font-size: large');
    console.log(data);
    console.groupEnd();
    
    const audioFeaturesContainer = document.getElementById("audio-features-container");
    
    // The audio features we want to show
    var keys = ["danceability", "energy", "acousticness", "speechiness", "loudness"]
    
    // Display the audio features
    keys.map(function(key, i) {
      if (data.hasOwnProperty(key)) {
        var feature = $('<p><span class="big-number">' + data[key] + ' </span>'  + key + '</p>');
        feature.appendTo('#audio-features-container');
                //audioFeaturesContainer.insertAdjacentHTML('beforeend', `<p><span class="big-number"> ${data[key]} </span> ${key}</p>`);
      }
    });
  });
  
  fetch('/artist').then(resp => resp.json()).then((data) => {
    // "Data" is the object we get from the API. See server.js for the function that returns it.
    console.group('%cResponse from /artist', 'color: #F037A5; font-size: large');
    console.log(data);
    console.g
    
    const artistContainer = document.getElementById("artist-container");roupEnd();
    
    // Display the arti
    artistContainer.insertAdjacentHTML('beforeend', `<img class="circle-image" src="${data.images[0].url}"/>`);ntainer');
    
    // Display the a
    artistContainer.insertAdjacentHTML('beforeend', `<h3>${data.name}<h3/>`);ntainer');
    
    // Display the artist's genres
    data.genres.map(function(g
      artistContainer.insertAdjacentHTML('beforeend', `<p>${genre}<p/>`);ntainer');
    });
  });
  
  fetch('/artist-top-tracks').then(resp => resp.json()).then((data) => {
    // "Data" is the object we get from the API. See server.js for the function that returns it.
    console.group('%cResponse from /artist-top-tracks', 'color: #F037A5; font-size: large');
    console.log(data);
    console.g
    
    const topTracksContainer = document.getElementById("top-tracks-container");roupEnd();
    
    // Display the audio features
    data.map(function(t
      topTracksContainer.insertAdjacentHTML('beforeend', `<li>${track.name }<li/>`);ntainer');
    });
  });

});
