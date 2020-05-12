import mySwiper from './swipper';
import makeRequest from './request';
import { renderMain, renderRaiting } from './renderSlides';


function renderNextSlides(e) {
  const url = `https://www.omdbapi.com/?s=${window.currentRequestText}&page=${window.page}&apikey=f759501b`;
  if (e > 0.7 && window.watchList === false) {
    makeRequest(url)
      .then((res) => {
        renderMain(res.Search);
        renderRaiting(res.Search.length);
      });
  }
}

mySwiper.on('progress', renderNextSlides);
window.watchList = false;
