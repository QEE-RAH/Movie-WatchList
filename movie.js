//This for the lightmode/darkmode, I changed the drop dwon to just the setting button, so if you click it changes directly
const modeToggle = document.querySelector(".mode-toggle");

modeToggle.addEventListener("click", () => {
  document.body.classList.toggle("light-mode");
});

//This is for the add movie and to create the table and display. i Later added the date added as its part of the table structure. About the poster, we need to brainstorm what we can do about it
let movies = JSON.parse(localStorage.getItem("movies")) || [];

const addMovieBtn = document.getElementById("add-movie-btn");
const movieTableBody = document.getElementById("movie-list");

// const filtered = getFilteredMovies();

addMovieBtn.addEventListener("click", () => {
  const title = document.getElementById("movie-title").value;
  const genre = document.getElementById("movie-genre").value;
  const duration = document.getElementById("movie-duration").value;
  const poster = document.getElementById("movie-poster").value;
  const status = document.getElementById("movie-status").value;

  if (title === "") {
    alert("Please enter a movie title");
    return;
  }

  if (editing === null) {
    const newMovie = {
      title,
      genre,
      duration,
      poster,
      status,
      dateAdded: new Date().toLocaleDateString(),
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
  localStorage.setItem("movies", JSON.stringify(movies));

  render();

  document.getElementById("movie-title").value = "";
  document.getElementById("movie-duration").value = "";
  document.getElementById("movie-poster").value = "";
});

//This is for the search
const searchInput = document.querySelector(
  '.left-control input[type="search"]',
);

searchInput.addEventListener("input", () => {
  render();
});

const filterButtons = document.querySelectorAll('.filter-btn');
let currentFilter = "All";
 filterButtons.forEach(btn => {
  btn.addEventListener('click', () =>{
     currentFilter = btn.textContent.trim();
     render();
  });
 });


function render() {
  movieTableBody.innerHTML = "";
  document.getElementById("total-count").innerHTML = movies.length;

  document.getElementById("watched-count").innerHTML = movies.filter(
    (movie) => movie.status === "Watched",
  ).length;

  document.getElementById("unwatched-count").innerHTML = movies.filter(
    (movie) => movie.status === "Not Watched",
  ).length;

  const searchTerm = searchInput.value.toLowerCase();
  let filteredMovies = movies.filter(movie => 
    movie.title.toLowerCase().includes(searchTerm)
  );
  
  // let filteredMovies = movies;
  if(currentFilter !== "All") {
    filteredMovies = filteredMovies.filter(
  movie => movie.status === currentFilter
);

  } 


  filteredMovies.forEach((movie) => {
    const index = movies.indexOf(movie);
    const row = document.createElement("tr");
    row.innerHTML = `
      <td>${index + 1}</td>
      <td><img src="${movie.poster}" alt="" width="40"></td>
      <td>${movie.title}</td>
      <td>${movie.genre}</td>
      <td>${movie.duration}</td>
      <td>${movie.dateAdded}</td>
      <td>
        <span class="status-badge ${movie.status === "Watched" ? "watched" : "not-watched"}">
          <i class="fa-solid fa-circle"></i> ${movie.status}
        </span>
      </td>
      <td>
        <button class="action-btn" onclick="toggleWatched(${index})">
          <i class="fa-solid ${movie.status === "Watched" ? "fa-eye-slash" : "fa-eye"}"></i>
          ${movie.status === "Watched" ? "Mark as Unwatched" : "Mark as Watched"}
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
function toggleWatched(index) {
  if (movies[index].status === "Watched") {
    movies[index].status = "Not Watched";
  } else {
    movies[index].status = "Watched";
  }
  localStorage.setItem("movies", JSON.stringify(movies));
  render();
}

//this is delete
function deleteMovie(index) {
  movies.splice(index, 1);
  localStorage.setItem("movies", JSON.stringify(movies));
  render();
}
//Edit
let editing = null;
function editMovie(index) {
  const movie = movies[index];

  document.getElementById("movie-title").value = movie.title;
  document.getElementById("movie-genre").value = movie.genre;
  document.getElementById("movie-duration").value = movie.duration;
  document.getElementById("movie-poster").value = movie.poster;
  document.getElementById("movie-status").value = movie.status;

  editing = index;
  addMovieBtn.textContent = "Update Movie";
}

const dateElement = document.getElementById("current-date");
const timeElement = document.getElementById("current-time");

function updateDateTime() {
  const now = new Date();

  const dateOptions = {
    weekday: "long",
    day: "numeric",
    month: "long",
    year: "numeric",
  };

  dateElement.textContent = now.toLocaleDateString("en-NG", dateOptions);

  const timeOptions = {
    hour: "2-digit",
    minute: "2-digit",
    second: "2-digit",
    hour12: true,
  };

  timeElement.textContent = now.toLocaleTimeString("en-NG", timeOptions);
}

// Show immediately
updateDateTime();

// Update every second
setInterval(updateDateTime, 1000);

render();

