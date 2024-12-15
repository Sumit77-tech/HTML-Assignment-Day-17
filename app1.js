const apiKey = 'YOUR_OMDB_API_KEY'; // Replace with your OMDB API key

// Get DOM elements
const movieSearch = document.getElementById('movieSearch');
const moviesList = document.getElementById('moviesList');
const movieDetails = document.getElementById('movieDetails');

// Throttle function to limit the frequency of API calls
function throttle(func, interval) {
  let lastCall = 0;
  return function (...args) {
    const now = Date.now();
    if (now - lastCall >= interval) {
      lastCall = now;
      func(...args);
    }
  };
}

// Fetch movie data from OMDB API
async function fetchMovies(query) {
  if (query.length < 3) return; // Avoid API calls for short queries

  const response = await fetch(`https://www.omdbapi.com/?s=${query}&apikey=${apiKey}`);
  const data = await response.json();

  if (data.Response === 'True') {
    displayMovieTitles(data.Search);
  } else {
    moviesList.innerHTML = 'No movies found.';
  }
}

// Display movie titles in the list
function displayMovieTitles(movies) {
  moviesList.innerHTML = ''; // Clear previous results
  movies.forEach(movie => {
    const div = document.createElement('div');
    div.textContent = movie.Title;
    div.addEventListener('click', () => showMovieDetails(movie.imdbID));
    moviesList.appendChild(div);
  });
}

// Fetch movie details using IMDb ID
async function showMovieDetails(imdbID) {
  const response = await fetch(`https://www.omdbapi.com/?i=${imdbID}&apikey=${apiKey}`);
  const data = await response.json();

  if (data.Response === 'True') {
    movieDetails.innerHTML = `
      <h3>${data.Title}</h3>
      <p><strong>Year:</strong> ${data.Year}</p>
      <p><strong>Genre:</strong> ${data.Genre}</p>
      <p><strong>Director:</strong> ${data.Director}</p>
      <p><strong>Actors:</strong> ${data.Actors}</p>
      <p><strong>Plot:</strong> ${data.Plot}</p>
    `;
  } else {
    movieDetails.innerHTML = 'Movie details not found.';
  }
}

// Add event listener for the search input field with throttling
movieSearch.addEventListener('input', throttle((e) => {
  fetchMovies(e.target.value);
}, 1000));
