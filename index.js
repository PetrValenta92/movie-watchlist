// ?? Data source https://www.omdbapi.com/
// ?? get your API key from https://www.omdbapi.com/apikey.aspx
// !! apiKey = 4530f1ff - I know it's nasty, but in this time it shouldn't make any damage !!

// -------------- VARIABLES --------------------------------

// Global array with the data from localStorage or an empty array
let watchlistArray = JSON.parse(localStorage.getItem('watchlistArray')) || []; 

// Local array of movie list 
let IDArray = []; 

// -------------- FUNCTIONS --------------------------------

// Add movie card HTML 
function getMovieCardHTML(ID) {
  fetch(`https://www.omdbapi.com/?apikey=4530f1ff&i=${ID}`)
    .then((respo) => respo.json())
    .then((data) => {
      document.getElementById("movie-list").innerHTML += `
        <div class="movie-card">
        <img
          class="movie-card__poster"
          src="${data.Poster}"
          alt="Movie poster image"
        />
        <div class="movie-card__info">
          <div class="info__grid-row-1">
            <h3 class="movie__title">${data.Title}</h3>
            <img
              class="movie__star-icon"
              src="./images/icons/star_icon.svg"
              alt="Star icon"
            />
            <p class="movie__rating">${data.imdbRating}</p>
          </div>
          <div class="info__grid-row-2">
            <p class="movie__lenght">${data.Runtime}</p>
            <p class="movie__genre">${data.Genre}</p>
            <button id="add-movie-${ID}" class="button--add">
              <img src="./images/icons/add_icon.svg" alt="Plus icon" />
              Watchlist
            </button>
          </div>
          <p class="movie__description">${data.Plot}</p>
        </div>
      </div>
        `;
    });
}

// Render movie list
function renderMovies(movieIDs) {
  movieIDs.forEach(getMovieCardHTML); 
}

// Get movie IDs from API req
async function getMovies(movie) {
  // fetch call is awaited
  try {
    const response = await fetch(
      `https://www.omdbapi.com/?apikey=4530f1ff&s=${movie}&type=movie&plot=full`
    );

    // verify if the HTTP request was successful. If not, it throws an error message
    if (!response.ok) {
      throw new Error(`HTTP error! Status: ${response.status}`);
    }

    const data = await response.json();

    if (data.Response === "True") {
      IDArray = data.Search.map((movie) => movie.imdbID);
      renderMovies(IDArray);       
    } else {
      document.getElementById("movie-list").innerHTML = `
        <div class="movies__container--label">
          <h3 class="label__title--problem">Unable to find what you're looking for. Please try another search.</h3>
        </div>
      `;
    }
  } catch (error) {
    console.error(`An error occurred while fetching the data: ${error.message}`);
  }

}

// Clear movie list 
function clearMovieList() {
  document.getElementById("movie-list").innerHTML = ``;
}

// Clear IDArray
function resetIDArray() {
  IDArray = [];
}

// --------------- EVENT LISTENERS ---------------

if (document.getElementById("submit")) {
  document.getElementById("submit").addEventListener("click", (e) => {
    e.preventDefault();
    clearMovieList(); 
    resetIDArray(); 
    const demandMovie = document.getElementById("search-movie").value;
    getMovies(demandMovie); 
  });
}

document.getElementById("movie-list").addEventListener("click", (e) => {
  IDArray.forEach((movieID) => {
    if (e.target.id === `add-movie-${movieID}`) {
      if (!watchlistArray.includes(movieID)) {
        watchlistArray.push(movieID);
        localStorage.setItem('watchlistArray', JSON.stringify(watchlistArray));
      }
    }
  });
});
