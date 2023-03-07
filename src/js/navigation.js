window.addEventListener('DOMContentLoaded', navigator, false);
window.addEventListener('hashchange', navigator, false);

function navigator() {
  if (location.hash.startsWith("#trends")) {
    trendsPage();
  } else if (location.hash.startsWith("#search=")) {
    searchPage();
  } else if (location.hash.startsWith("#movie=")) {
    moviePage();
  } else if (location.hash.startsWith("#category=")) {
    categoryPage();
  } else {
    homePage();
  }

  location.hash;
}

function trendsPage() {
  console.log('trends');
}
function searchPage() {
  console.log('search');
}
function moviePage() {
  console.log('movie');
  const [_, movieId] = location.hash.split('=');
  getDetailsMovie(movieId);
}
function categoryPage() {
  back.classList.remove('inactive');
  categories.classList.add('inactive');

  const [_, categoryInfo] = location.hash.split('=');
  const [categoryId, categoryName] = categoryInfo.split('-');
  getMoviesByCategory(categoryId);
  
  titleContentMain.innerHTML = categoryName.replace('%20', ' ');
}
function homePage() {
  getTrendingMovies();
  getCategories();
}