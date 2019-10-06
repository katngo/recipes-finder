'use strict';
const bookKey = "AIzaSyBa1n_4elEsEupz-dCdtVjqyaBWNj26nj4";
const webKey = "81efb0e63df246370c2d92cc57051710";
const youtubeKey = "AIzaSyAg2fa3xtcErMjHB3OZZcwrjABY8Vi9-WY";
const bookURL = "https://www.googleapis.com/books/v1/volumes?";
const webURL = "https://www.food2fork.com/api/search?";
const youtubeURL = "https://www.googleapis.com/youtube/v3/search?";

function getYoutube(searchVideos) {
  const getYoutubeLink = {
    q: searchVideos,
    key: youtubeKey,
    part: 'snippet'
  }
  const urlForVideos = youtubeURL + $.param(getYoutubeLink);
  fetch(urlForVideos)
  .then(response => {
    if (response.ok) {
      return response.json();
    }
    throw new Error (response.statusText);
  })
  .then(responseJson => showVideoResults(responseJson))
  .catch(e => {
    $('#error-message').text(`Something went wrong. ${err.message}`);
  });
}

function showVideoResults(responseJson) {
  console.log(responseJson);
  for (let i = 0; i < responseJson.items.length; i++) {
    $('.video-results').append(`
      <li><h3>${responseJson.items[i].snippet.title}</h3>
      

      <iframe width="100" height="115" src="https://www.youtube.com/embed/${responseJson.items[i].id.videoId}" frameborder="0" allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>
      </li>`)
  };
}


function getRecipesFromWeb(searchForWeb) {
  const getKey = {
    q: searchForWeb,
    key: webKey
  }
  const urlForWeb = webURL + $.param(getKey);
  fetch(urlForWeb)
  .then(response => {
    if (response.ok) {
      return response.json();

    }
    throw new Error (response.statusText);
  })
  .then(responseJson => showWebResults(responseJson))
  .catch(e => {
    $('#error-message').text(`Something went wrong. ${err.message}`);
  });
}

function showWebResults(responseJson) {
  console.log(responseJson);
 for (let i = 0; i < responseJson.recipes.length; i++) {
   $('.web-results').append(` 
   <li><a href='${responseJson.recipes[i].source_url}'>${responseJson.recipes[i].title}</a>
   <img class="img" width="100" height="100" src='${responseJson.recipes[i].image_url}'></li>`)
  }
 }
function getRecipes(searchTerm) {
  const getKeyword = {
    q: searchTerm,
    key: bookKey
  }
  
  const finalURL = bookURL + $.param(getKeyword);
  fetch(finalURL)
  .then(response => {
    if (response.ok) {
      return response.json();
    }
    throw new Error (response.statusText);
  })
  .then(responseJson => showBookResults(responseJson))
  .catch(err => {
    $('#error-message').text(`Something went wrong. ${err.message}`);
  });
}

function showBookResults(responseJson) {
  console.log(responseJson);
  for (let i=0; i< responseJson.items.length; i++) {
  $('.book-results').append(`
  <li><h3>${responseJson.items[i].volumeInfo.title}</h3></li>
  <li><a href='${responseJson.items[i].volumeInfo.previewLink}'>Link</a></li>
  `)
  }
}

function watchForm() {
  $('form').submit(event => {
    event.preventDefault();
     $('.video-results').empty();
     $('.book-results').empty();
     $('.web-results').empty();
    const getInput= $('#items-search').val()+ ' recipes';
    getRecipes(getInput);
    getRecipesFromWeb(getInput);
    getYoutube(getInput);
    $('.hidden-link').show();
  })
}
$(watchForm);
