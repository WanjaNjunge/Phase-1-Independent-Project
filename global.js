'use strict';

//add event on multiple elements

const addEventOnElements = function (elements, eventType, callback) {
  for (const elem of elements) elem.addEventListener(eventType, callback)
}

//Toggle search box 

const searchBox = document.querySelector("[search-box]");
const searchTogglers = document.querySelectorAll("[search-toggler]");

addEventOnElements(searchTogglers, "click", function() {
  searchBox.classList.toggle("active");
})



const form = document.querySelector('#movie-form');
const genreSelect = document.querySelector('#genre-select');
const yearFromInput = document.querySelector('#year-from');
const yearToInput = document.querySelector('#year-to');
const resultsContainer = document.querySelector('#movie-results');

form.addEventListener('submit', async (event) => {
  event.preventDefault();

  // get user inputs
  const genre = genreSelect.value;
  const yearFrom = yearFromInput.value;
  const yearTo = yearToInput.value;

  // build API URL
  const apiUrl = `https://api.themoviedb.org/3/discover/movie?api_key=79b6e476480f1e9ea75e81bc7be0cdf6&language=en-US&sort_by=popularity.desc&include_adult=false&include_video=false&with_genres=${genre}&primary_release_date.gte=${yearFrom}-01-01&primary_release_date.lte=${yearTo}-12-31`;

  try {
    // fetch movie data from API
    const response = await fetch(apiUrl);
    const data = await response.json();
    const movies = data.results;

    // render movie data to the DOM
    let resultsHtml = '';
    movies.forEach((movie) => {
      resultsHtml += `
      <div class="movie">
        <img src="https://image.tmdb.org/t/p/w500${movie.poster_path}" alt="${movie.title}">
        <div class="movie-details">
          <h2>${movie.title}</h2>
          <p>Release date: ${movie.release_date}</p>
          <p>Overview: ${movie.overview}</p>
        </div>
      </div>
      `;
    });
    resultsContainer.innerHTML = resultsHtml;
  } catch (error) {
    console.error(error);
  }
});


//search modal



const API_KEY = '79b6e476480f1e9ea75e81bc7be0cdf6'; 

// function to make asynchronous request to TMDB API
const searchMovies = async (query) => {
  const response = await fetch(`https://api.themoviedb.org/3/search/movie?api_key=${API_KEY}&query=${query}`);
  const data = await response.json();
  return data.results;
};

// function to display search results on the page
const displaySearchResults = (results) => {
  // get reference to search results container element
  const searchResultsContainer = document.querySelector('#search-results');
  // clear existing search results
  searchResultsContainer.innerHTML = '';
  // define searchResultsRow variable as empty string
  let searchResultsRow = '';

  // create HTML elements for each search result
  results.forEach((result, index) => {
    // create HTML elements for search result
    const searchResult = document.createElement('div');
    searchResult.classList.add('search-result');
    const moviePosterElem = document.createElement('img');
    const movieTitleElem = document.createElement('h3');
    
    // set src and alt attributes of movie poster element
    if (result.poster_path !== null) {
      const moviePoster = `https://image.tmdb.org/t/p/w500${result.poster_path}`;
      moviePosterElem.src = moviePoster;
      moviePosterElem.alt = result.title;
    } else {
      moviePosterElem.src = 'https://via.placeholder.com/500x750';
      moviePosterElem.alt = 'No poster available';
    }

    // set text content of movie title element
    movieTitleElem.textContent = result.title;

    // add search result elements to container
    searchResult.appendChild(moviePosterElem);
    searchResult.appendChild(movieTitleElem);

    // add search result to row
    searchResultsRow += searchResult.outerHTML;

    // if index is divisible by 4 or it's the last item, add row to container
    if ((index + 1) % 4 === 0 || index === results.length - 1) {
      const searchResultsRowElem = document.createElement('div');
      searchResultsRowElem.classList.add('search-results-row');
      searchResultsRowElem.innerHTML = searchResultsRow;
      searchResultsContainer.appendChild(searchResultsRowElem);
      searchResultsRow = '';
    }
  });
};




// add event listener to search box element

searchBox.addEventListener('input', async (event) => {
  // get user input from search box
  const userInput = event.target.value;

  // if search box is empty, clear search results and return
  if (!userInput) {
    displaySearchResults([]);
    return;
  }

  // search TMDB API for movies matching user input
  const searchResults = await searchMovies(userInput);

  // display search results on page
  displaySearchResults(searchResults);
});

































