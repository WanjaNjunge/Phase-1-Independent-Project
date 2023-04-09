'use strict';

//add event on multiple elements

const addEventOnElements = function (elements, eventType, callback) {
    for (const elem of elements) elem.addEventListener(eventType, callback)
}

//Togle search box 

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
        <div>
          <h2>${movie.title}</h2>
          <p>Release date: ${movie.release_date}</p>
          <p>Overview: ${movie.overview}</p>
        </div>
      `;
    });
    resultsContainer.innerHTML = resultsHtml;
  } catch (error) {
    console.error(error);
  }
});
