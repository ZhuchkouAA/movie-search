import mySwiper from './swipper';
import makeRequest from './request';
import { renderMain, renderRaiting } from './renderSlides';


function renderNextSlides(e) {
  const url = `https://www.omdbapi.com/?s=${window.currentRequestText}&page=${window.page}&apikey=f759501b`;
  if (e > 0.7 && window.watchList === false) {
    mySwiper.off('progress', renderNextSlides);
    makeRequest(url)
      .then((res) => {
        if (res.Response === 'True') {
          renderMain(res.Search);
          renderRaiting(res.Search.length);
        }
        document.querySelector('.swiper-lazy-preloader').classList.add('disable');
        mySwiper.on('progress', renderNextSlides);
      });
  }
}

mySwiper.on('progress', renderNextSlides);
window.watchList = false;
