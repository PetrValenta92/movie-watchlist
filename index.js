// Data source https://www.omdbapi.com/
// get API key from https://www.omdbapi.com/apikey.aspx

// !Delete later!
const apiKey = "4530f1ff";

document.getElementById("submit").addEventListener("click", (e) => {
  e.preventDefault();
  const demandMovie = document.getElementById("demand-movie").value;

  fetch(`https://www.omdbapi.com/?apikey=${apiKey}&s=${demandMovie}`)
    .then((respo) => respo.json())
    .then((data) => {
      console.log(data.Search);
    });
});
