// Data source https://www.omdbapi.com/
// get API key from https://www.omdbapi.com/apikey.aspx
// apiKey = 4530f1ff

let IDArray;

function renderMovie(ID) {
  fetch(`https://www.omdbapi.com/?apikey=4530f1ff&i=${ID}`)
    .then((respo) => respo.json())
    .then((data) => {
      document.getElementById('movie-list').innerHTML += 
        `
        <div class="movie-card">
        <img
          class="movie-card__image"
          src="${data.Poster}"
          alt="Movie poster image"
        />
        <div class="movie-card__info">
          <div class="info__grid-row-1">
            <h3 class="movie__title">${data.Title}</h3>
            <img
              class="movie__star-icon"
              src="./images/star_icon.svg"
              alt="Star icon"
            />
            <p class="movie__rating">${data.imdbRating}</p>
          </div>
          <div class="info__grid-row-2">
            <p class="movie__lenght">${data.Runtime}</p>
            <p class="movie__genre">${data.Genre}</p>
            <button class="button--add">
              <img src="./images/add_icon.svg" alt="Plus icon" />
              Watchlist
            </button>
          </div>
          <p class="movie__description">${data.Plot}</p>
        </div>
      </div>
        `
    } )
}

function renderMovies(movieIDs) {
  movieIDs.forEach(renderMovie); // fills movie HTML with the movie data from the ID list
}

function getMovies(movie) {
  fetch(`https://www.omdbapi.com/?apikey=4530f1ff&s=${movie}&type=movie&plot=full`)
    .then((respo) => respo.json())
    .then((data) => {
      if (data.Response === "True") {
        IDArray = data.Search.map((movie) => movie.imdbID);
        renderMovies(IDArray);
        resetIDArray(); // clears the list of movie IDs
      } else {
        console.error('The movie you are trying to find does not exist, or is not part of the database! Please try another movie.');
      }     
    });
}

function clearMovieList() {
  document.getElementById('movie-list').innerHTML = ``;
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
