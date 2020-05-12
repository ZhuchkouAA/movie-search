if (localStorage.getItem('favorites') === null) {
  localStorage.setItem('favorites', JSON.stringify({}));
}

export function addInfoFilm(target) {
  const title = target.parentNode.previousElementSibling.innerHTML;
  const titleUrl = target.parentNode.previousElementSibling.href;
  const imgUrl = target.previousElementSibling.src;
  const year = target.parentNode.nextElementSibling.innerHTML;
  const raiting = target.parentNode.nextElementSibling.nextElementSibling.childNodes[1].textContent;
  return [title, titleUrl, imgUrl, year, raiting];
}

export function addToFavorites(e) {
  const favoritesStorage = JSON.parse(localStorage.getItem('favorites'));
  const id = e.target.getAttribute('data-id');
  if (e.target.classList.contains('favorite-active')) {
    e.target.classList.remove('favorite-active');
    delete favoritesStorage[id];
  } else {
    e.target.classList.add('favorite-active');
    favoritesStorage[id] = addInfoFilm(e.target);
  }
  localStorage.setItem('favorites', JSON.stringify(favoritesStorage));
}

export function isFavorite(id) {
  const favoritesStorage = JSON.parse(localStorage.getItem('favorites'));
  if (favoritesStorage.hasOwnProperty(id)) {
    return ' favorite-active';
  }
  return '';
}
