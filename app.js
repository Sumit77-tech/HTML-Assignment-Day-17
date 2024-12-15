const apiKey = 'YOUR_OMDB_API_KEY'; // Replace with your OMDB API key

// Get DOM elements
const movieSearch = document.getElementById('movieSearch');
const moviesList = document.getElementById('moviesList');
const movieDetails = document.getElementById('movieDetails');

// Debounce function to delay API calls
function debounce(func, delay) {
  let timer;
  return function (...args) {
    clearTimeout(timer);
    timer = setTimeout(() => func(...args), delay);
  };
}

// Function to fetch movies from OMDB API
async function fetchMovies(query) {
  if (query.length < 3) return; // Avoid making requests for short queries

  const response = await fetch(`https://www.omdbapi.com/?s=${query}&apikey=${apiKey}`);
  const data = await response.json();

  if (data.Response === 'True') {
    displayMovieTitles(data.Search);
  } else {
    moviesList.innerHTML = 'No movies found.';
  }
}

// Function to display movie titles in the list
function displayMovieTitles(movies) {
  moviesList.innerHTML = ''; // Clear previous results
  movies.forEach(movie => {
    const div = document.createElement('div');
    div.textContent = movie.Title;
    div.addEventListener('click', () => showMovieDetails(movie.imdbID));
    moviesList.appendChild(div);
  });
}

// Function to fetch movie details by IMDb ID
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

// Add event listener for the search input field with debouncing
movieSearch.addEventListener('input', debounce((e) => {
  fetchMovies(e.target.value);
}, 500));
