import mySwiper from './swipper';
import { renderMain, renderRaiting } from './renderSlides';
import { isEmpty } from './pureFunctions';

function renderWatchList() {
  document.querySelector('.container-keyboard').classList.add('disable');
  document.querySelector('.text').classList.add('disable');
  const storage = JSON.parse(localStorage.getItem('favorites'));
  mySwiper.removeAllSlides();
  window.readyCheckArray = [];
  mySwiper.activeIndex = 0;
  window.page = 1;
  if (isEmpty(storage)) {
    document.querySelector('.result-searching').innerHTML = 'favorites list is empty';
    return;
  }
  window.watchList = true;
  const filmList = [];
  for (const filmId in storage) {
    const filmInfo = {};
    filmInfo.Poster = storage[filmId][2];
    filmInfo.Title = storage[filmId][0];
    filmInfo.Type = 'movie';
    filmInfo.Year = storage[filmId][3];
    filmInfo.imdbID = filmId;
    filmList.push(filmInfo);
  }

  renderMain(filmList);
  renderRaiting(filmList.length);
}

document.querySelector('.watch-list').addEventListener('click', renderWatchList);
