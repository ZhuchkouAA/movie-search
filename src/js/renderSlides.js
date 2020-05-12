import mySwiper from './swipper';
import makeRequest from './request';
import { addToFavorites, isFavorite } from './favorites';

const resultText = document.querySelector('.result-searching');


function addReadyCheckListener() {
  const pictures = document.querySelectorAll('.slide-img');
  window.readyCheckImgLength = pictures.length;
  [...pictures].forEach((img) => {
    const slideImg = img;
    slideImg.onload = () => {
      window.readyCheckArray.push('ready');
    };

    slideImg.onerror = () => {
      window.readyCheckArray.push('error');
    };
  });
}

function readyCheck() {
  if (window.readyCheckImgLength === window.readyCheckArray.length) {
    document.querySelector('.swiper-container').classList.remove('invisible');
    document.querySelector('.swiper-container').classList.add('smooth-animation');
  } else {
    setTimeout(readyCheck, 300);
  }
}

export function renderMain(filmList) {
  document.querySelector('.container-keyboard').classList.add('disable');
  document.querySelector('.text').classList.add('disable');
  document.querySelector('.swiper-container').classList.remove('shadow');
  if (window.page === 1) {
    document.querySelector('.swiper-container').classList.add('invisible');
    document.querySelector('.swiper-container').classList.remove('smooth-animation');
  }
  try {
    const startSlidesNum = filmList.length;
    let slides = '';
    for (let i = 0; i < startSlidesNum; i += 1) {
      let srcImg;
      if (filmList[i].Poster !== 'N/A') {
        srcImg = filmList[i].Poster;
      } else {
        srcImg = './assets/img/unknown.jpg';
      }
      slides += `
      <div class="swiper-slide">
        <a href="https://www.imdb.com/title/${filmList[i].imdbID}/videogallery/" class="title">${filmList[i].Title}</a>
        <div class="container-slide"><img class="slide-img" src="${srcImg}">
        <img class="favorite${isFavorite(filmList[i].imdbID)}" data-id="${filmList[i].imdbID}" src="assets/img/favorite.svg">
        </div>
        <div class="year">${filmList[i].Year}</div>
        <div class="raiting" data-id="${filmList[i].imdbID}"></div>
      </div>
        `;
    }
    mySwiper.appendSlide(slides);
    if (window.page === 1) {
      addReadyCheckListener();
      readyCheck();
    }
    window.page += 1;
  } catch (e) {

  }
}

export function renderRaiting(slidesCount) {
  let raitings = document.querySelectorAll('.raiting');
  raitings = [...raitings].slice(raitings.length - slidesCount);
  raitings.forEach((divRaiting) => {
    divRaiting.previousElementSibling.previousElementSibling.children[1].addEventListener('click', addToFavorites);
    const url = `https://www.omdbapi.com/?i=${divRaiting.getAttribute('data-id')}&apikey=f759501b`;
    makeRequest(url)
      .then((res) => {
        divRaiting.innerHTML = `<img src="assets/img/star.svg">${res.imdbRating}`;
        document.querySelector('.swiper-lazy-preloader').classList.add('disable');
      });
  });
}

window.currentRequestText = 'star wars';

export function requestFilms(isRemoveSlides) {
  const url = `https://www.omdbapi.com/?s=${window.currentRequestText}&page=${window.page}&apikey=f759501b`;
  makeRequest(url)
    .then((res) => {
      if (isRemoveSlides) {
        window.readyCheckArray = [];
        mySwiper.removeAllSlides();
        mySwiper.activeIndex = 0;
        window.watchList = false;
      }
      if (res.Search === undefined) {
        resultText.innerHTML = `No results for ${window.currentRequestText}`;
        if (res.Error) {
          resultText.innerHTML = `Error: ${res.Error}`;
        }
        document.querySelector('.swiper-lazy-preloader').classList.add('disable');
      } else {
        renderMain(res.Search);
        renderRaiting(res.Search.length);
        resultText.innerHTML = `Showing results for ${window.currentRequestText}`;
      }
    });
}

requestFilms();
