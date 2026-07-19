// const myLists = document.querySelector(".lists");
// const dropdownbtn = document.querySelector(".fa-gear");

// dropdownbtn.addEventListener("click", () => {
//   DropDownLists();
// });

// function DropDownLists() {
//   myLists.classList.toggle("click");
// } 

// const lightModeBtn = document.querySelector(".lists li:nth-child(1)");
// const darkModeBtn = document.querySelector(".lists li:nth-child(2)");

// lightModeBtn.addEventListener("click", () => {
//   document.body.classList.add("light-mode");
// });

// darkModeBtn.addEventListener("click", () => {
//   document.body.classList.add("dark-mode");
// });

//This for the lightmode/darkmode, I changed the drop dwon to just the setting button, so if you click it changes directly
const modeToggle = document.querySelector(".mode-toggle");

modeToggle.addEventListener("click", () => {
  document.body.classList.toggle("light-mode");
});

//This is for the add movie and to create the table and display. i Later added the date added as its part of the table structure. About the poster, we need to brainstorm what we can do about it
let movies = []
const addMovieBtn = document.getElementById('add-movie-btn');
const movieTableBody = document.getElementById('movie-list'); 

addMovieBtn.addEventListener('click', () => {
  const title = document.getElementById('movie-title').value;
  const genre = document.getElementById('movie-genre').value;
  const duration = document.getElementById('movie-duration').value;
  const poster = document.getElementById('movie-poster').value;
  const status = document.getElementById('movie-status').value;

  if (title === '') {
    alert('Please enter a movie title');
    return;
  }

  if(editing === null){
    const newMovie = {
      title, genre, duration, poster, status,
      dateAdded: new Date().toLocaleDateString()
    };
    movies.push(newMovie);
  } else {
    movies[editing].title = title;
    movies[editing].genre = genre;
    movies[editing].duration = duration;
    movies[editing].poster = poster;
    movies[editing].status = status;
    editing = null;
    addMovieBtn.textContent = "+ Add Movie";
  }

  render();

  document.getElementById('movie-title').value = '';
  document.getElementById('movie-duration').value = '';
  document.getElementById('movie-poster').value = '';
});

//This is for the search
const searchInput = document.querySelector('.left-control input[type="search"]');

searchInput.addEventListener('input', () => {
  render();
});

function render() {
  movieTableBody.innerHTML = '';

  const searchTerm = searchInput.value.toLowerCase();
  const filteredMovies = movies.filter(movie =>
    movie.title.toLowerCase().includes(searchTerm)
  );

  filteredMovies.forEach((movie) => {
    const index = movies.indexOf(movie);
    const row = document.createElement('tr');
    row.innerHTML = `
      <td>${index + 1}</td>
      <td><img src="${movie.poster}" alt="" width="40"></td>
      <td>${movie.title}</td>
      <td>${movie.genre}</td>
      <td>${movie.duration}</td>
      <td>${movie.dateAdded}</td>
      <td>
        <span class="status-badge ${movie.status === 'Watched' ? 'watched' : 'not-watched'}">
          <i class="fa-solid fa-circle"></i> ${movie.status}
        </span>
      </td>
      <td>
        <button class="action-btn" onclick="toggleWatched(${index})">
          <i class="fa-solid ${movie.status === 'Watched' ? 'fa-eye-slash' : 'fa-eye'}"></i>
          ${movie.status === 'Watched' ? 'Mark as Unwatched' : 'Mark as Watched'}
        </button>
        <button class="delete-btn" onclick="deleteMovie(${index})">
          <i class="fa-solid fa-trash"></i>
        </button>
        <button class="action-btn" onclick="editMovie(${index})">
          <i class="fa-solid fa-pen"></i>Edit
        </button>
      </td>
    `;
    movieTableBody.appendChild(row);
  });
}
//This is to toggle between watched and not watched under actions also reflects in status
function toggleWatched(index){
  if (movies[index].status === "Watched"){
    movies[index].status = "Not Watched";
  } else {
    movies[index].status = "Watched"
  }
  render();
}

//this is delete
function deleteMovie(index){
  movies.splice(index, 1);
  render();
}
//Edit
let editing = null;
function editMovie(index){
  const movie = movies[index];

  document.getElementById('movie-title').value = movie.title;
  document.getElementById('movie-genre').value = movie.genre;
  document.getElementById('movie-duration').value = movie.duration;
  document.getElementById('movie-poster').value = movie.poster;
  document.getElementById('movie-status').value = movie.status;
  
  editing = index;
  addMovieBtn.textContent = "Update Movie";
}