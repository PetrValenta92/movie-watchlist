// Data source https://www.omdbapi.com/
// get API key from https://www.omdbapi.com/apikey.aspx
// apiKey = 4530f1ff

function getIDArray(movie) {
  fetch(
    `https://www.omdbapi.com/?apikey=4530f1ff&s=${movie}&type=movie&plot=full`
  )
    .then((respo) => respo.json())
    .then((data) => {
      const IDArray = data.Search.map((movie) => movie.imdbID);
      console.log(IDArray); // ?debugging
      return IDArray;
    });
}

document.getElementById("submit").addEventListener("click", (e) => {
  e.preventDefault();
  const demandMovie = document.getElementById("search-movie").value;
  getIDArray(demandMovie);
});
