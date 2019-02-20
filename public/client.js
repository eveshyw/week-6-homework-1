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
    
    data
      .forEach((t) => {
        searchTrackContainer.insertAdjacentHTML('beforeend', `<h3><a href="${t.data.tracks.items[0].external_urls.spotify}">${t.name}</a></h3>`);
    
        // Display the artist name
        var artists = '';

        t.data.tracks.items[0].artists.forEach(function(item) {
          artists = artists + item.name + ' ';
        });

        let h5 = document.createElement('h5');
        h5.innerText = artists;
        searchTrackContainer.append(h5);

        // Display the album art
        searchTrackContainer.insertAdjacentHTML('beforeend', `<img src="${t.data.tracks.items[0].album.images[0].url}"/>`);
      })
  

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
    
    data
      .forEach((t) => {
        audioFeaturesContainer.insertAdjacentHTML('beforeend', `<br><h1>${t.name}</h1><br>`);
        // Display the audio features
        keys.map(function(key, i) {
          if (t.data.hasOwnProperty(key)) {
            audioFeaturesContainer.insertAdjacentHTML('beforeend', `<p><span class="big-number"> ${t.data[key]} </span> ${key}</p>`);
          }
        });
    })
    
  });
  
  fetch('/artist').then(resp => resp.json()).then((data) => {
    // "Data" is the object we get from the API. See server.js for the function that returns it.
    console.group('%cResponse from /artist', 'color: #F037A5; font-size: large');
    console.log(data);
    console.groupEnd();
    
    const artistContainer = document.getElementById("artist-container");
    
    data
      .forEach((artist) => {
        // Display the artist image
        artistContainer.insertAdjacentHTML('beforeend', `<img class="circle-image" src="${artist.data.images[0].url}"/>`);

        // Display the artist name
        artistContainer.insertAdjacentHTML('beforeend', `<h3>${artist.data.name}</h3>`);

        // Display the artist's genres
        artist.data.genres.map(function(genre, i) {
          artistContainer.insertAdjacentHTML('beforeend', `<p>${genre}</p>`);
    });
    })
  });
  
  fetch('/artist-top-tracks').then(resp => resp.json()).then((data) => {
    // "Data" is the object we get from the API. See server.js for the function that returns it.
    console.group('%cResponse from /artist-top-tracks', 'color: #F037A5; font-size: large');
    console.log(data);
    console.groupEnd();
    
    const topTracksContainer = document.getElementById("top-tracks-container");
    data
      .forEach((artist) => {
          topTracksContainer.insertAdjacentHTML('beforeend', `<ol id="${artist.name}">${artist.name}</ol>`);
        // Display the top tracks
        var listContainer = document.getElementById(`${artist.name}`);
        artist.data.tracks.map(function(track, i) {
          listContainer.insertAdjacentHTML('beforeend', `<li>${track.name }</li>`);
        });
    })
    
  });

});
