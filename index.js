// Data source https://www.omdbapi.com/
// get API key from https://www.omdbapi.com/apikey.aspx
// apiKey = 4530f1ff

let IDArray;

function renderMovie(ID) {
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
            <button class="button--add">
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

function renderMovies(movieIDs) {
  movieIDs.forEach(renderMovie); // fills movie HTML with the movie data from the ID list
}

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
      renderMovies(IDArray); // renders first 10 movie cards 
      resetIDArray(); // clears the list of movie IDs
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

function clearMovieList() {
  document.getElementById("movie-list").innerHTML = ``;
}

function resetIDArray() {
  IDArray = [];
}

document.getElementById("submit").addEventListener("click", (e) => {
  e.preventDefault();
  clearMovieList(); // clears data from #movie-list <div>
  const demandMovie = document.getElementById("search-movie").value;
  getMovies(demandMovie); // gives a list of searched movie IDs
});
