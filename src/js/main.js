// $(document).ready(function () {
//   // ================= DROPDOWN =================

//   $("nav ul li a:not(:only-child)").click(function (e) {
//     e.preventDefault();
//     $(this).siblings(".nav-dropdown").toggle();
//     // Close one dropdown when selecting another
//     $(".nav-dropdown").not($(this).siblings()).hide();
//     e.stopPropagation();
//   });
//   // Clicking away from dropdown will remove the dropdown class
//   $("html").click(function () {
//     $(".nav-dropdown").hide();
//   });
//   // Toggle open and close nav styles on click
//   $("#nav-toggle").click(function () {
//     $("nav ul").slideToggle();
//   });
//   // Hamburger to X toggle
//   $("#nav-toggle").on("click", function () {
//     this.classList.toggle("active");
//   });
// });

const API = axios.create({
  baseURL: "https://api.themoviedb.org/3",
  headers: {
    "Content-Type": "application/json;charset=utf-8",
  },
  params: {
    api_key: API_KEY,
  },
});

async function getTrendingMovies() {
  cardsContainer.innerHTML = "";
  const { data } = await API("/trending/movie/day");
  const movies = data.results;
  movies.forEach((movie) => {
    const template = `
    <li class="cards__item">
      <div class="card">
        <div class="card__image card__image" style="background: url(https://image.tmdb.org/t/p/w300${movie.backdrop_path}) center / cover no-repeat;"></div>
        <div class="card__content">
          <div class="card__title">${movie.title}</div>
          <p class="card__text">${movie.overview}</p>
          <a href="movie.html#movie=${movie.id}" class="btn btn--block card__btn">View</a>
        </div>
      </div>
    </li>
    `;
    cardsContainer.innerHTML += template;
  });
}

async function getCategories() {
  categoriesContainer.innerHTML = "";
  const { data } = await API("/genre/movie/list");
  const categories = data.genres;
  categories.forEach((category) => {
    const template = `
      <a href="#category=${category.id}-${category.name}">${category.name}</a>
    `;
    categoriesContainer.innerHTML += template;
  });
}

async function getDetailsMovie(id) {
  const { data } = await API("/movie/" + id);
  let categories = "";
  data.genres.forEach((item) => {
    categories += item.name + ' ';
  })
  const template = `
    <div class="movie-img">
        <img src="https://image.tmdb.org/t/p/w300${data.backdrop_path}" alt="${data.title}">
    </div>
    <div class="movie-info">
        <h3 class="movie-title">${data.title}</h3>
        <p class="movie-categories">${categories}</p>
        <p class="movie-vote"><span>${data.vote_average}</span> <i class="fa-solid fa-star"></i></p>
        <p class="movie-description">${data.overview}</p>
    </div>
    <div class="movie-play">
        <h2 class="sub-titles-sections">Play To Movie</h2>
        <iframe src="https://www.youtube.com/embed/wZEgv9PNm2Q"
            title="YouTube video player" frameborder="0"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowfullscreen></iframe>
    </div>
  `;
  boxMovie.innerHTML = template;
}

async function getMoviesByCategory(id) {
  cardsContainer.innerHTML = "";
  const { data } = await API("/discover/movie", {
    params: {
      with_genres: id,
    },
  });
  const movies = data.results;
  movies.forEach((movie) => {
    const template = `
    <li class="cards__item">
      <div class="card">
        <div class="card__image card__image" style="background: url(https://image.tmdb.org/t/p/w300${movie.backdrop_path}) center / cover no-repeat;"></div>
        <div class="card__content">
          <div class="card__title">${movie.title}</div>
          <p class="card__text">${movie.overview}</p>
          <a href="movie.html#movie=${movie.id}" class="btn btn--block card__btn">View</a>
        </div>
      </div>
    </li>
    `;
    cardsContainer.innerHTML += template;
  });
}
