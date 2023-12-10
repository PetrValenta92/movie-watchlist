// Global array with the data from localStorage or an empty array
let watchlistArray = JSON.parse(localStorage.getItem('watchlistArray')) || []; 

// ---------------------- FUNCTIONS --------------------------------

// Get Watchlist movie card HTML
function getWatclistMovieCardHTML(ID) {
    fetch(`https://www.omdbapi.com/?apikey=4530f1ff&i=${ID}`)
      .then((respo) => respo.json())
      .then((data) => {
        document.getElementById("watchlist").innerHTML += `
            <div class="movie-card">
            <img
                class="movie-card__poster"
                src="${data.Poster}"
                alt="Movie poster image"
            />
            <div class="movie-card__info">
                <div class="info__grid-row-1">
                    <h3 class="movie__title">${data.Title}</h3>
                    <div class="movie__rating">
                <img
                  class="rating__star-icon"
                  src="./images/icons/star_icon.svg"
                  alt="Star icon"
                />
                <p class="rating__number">${data.imdbRating}</p>
              </div>
                </div>
                <div class="info__grid-row-2">
                    <p class="movie__lenght">${data.Runtime}</p>
                    <p class="movie__genre">${data.Genre}</p>
                    <button id="remove-movie-${ID}" class="button--remove">
                        <img src="./images/icons/remove_icon.svg" alt="Minus icon" />
                        Remove
                    </button>
                    </div>
                    <p class="movie__description">${data.Plot}</p>
                </div>
            </div>
          `;
    });
}

// Render Watchlist
function renderWatchlist(movieIDs) {
    movieIDs.forEach(getWatclistMovieCardHTML); 
}

// Clear Watchlist 
function clearWatchlist() {
    document.getElementById("watchlist").innerHTML = ``;
  }

// Update Watchlist
function updateWatchlist(movieIDs) {
    clearWatchlist();
    renderWatchlist(movieIDs);
}

// Get No-watchlist label HTML
function getNoWatchlistLabelHTML() {
    let labelHTML = "";
    labelHTML = `
        <div class="movies__container--label">
            <h3 class="label__title">
            Your watchlist is looking a little empty...
            </h3>
            <a href="./index.html" class="button--add">
                <img src="./images/icons/add_icon.svg" alt="Plus icon" />
                Let's add some movies! Shall we?
            </a>
        </div>
    `;

    return labelHTML;
}

// Render No-watchlist label
function renderNoWatchlistLabel() {
    document.getElementById("watchlist").innerHTML = getNoWatchlistLabelHTML();
}


// ------------------ EVENT LISTENERS ------------------

document.getElementById("watchlist").addEventListener("click", (e) => {
    watchlistArray.forEach((movieID) => {
        if (e.target.id === `remove-movie-${movieID}`) {
            const index = watchlistArray.indexOf(movieID);

            if (index !== -1) {
                watchlistArray.splice(index, 1);
            }
            localStorage.setItem('watchlistArray', JSON.stringify(watchlistArray));
            
            if (localStorage.getItem('watchlistArray') === null || JSON.parse(localStorage.getItem('watchlistArray')).length === 0) {
                renderNoWatchlistLabel(); 
            } else {
                updateWatchlist(watchlistArray);
            }
        }
    })
})


// Render Watchlist or No-watchlist label
if (localStorage.getItem('watchlistArray') === null || JSON.parse(localStorage.getItem('watchlistArray')).length === 0) {
    renderNoWatchlistLabel(); 
} else {
    renderWatchlist(watchlistArray);
}
  




