// eslint-disable-next-line import/prefer-default-export
import Swiper from '../libs/swiper/swiper.min';
const width = document.documentElement.scrollWidth;
let slides;
if (width > 950) {
  slides = 4;
} else if (width <= 950 && width > 760) {
  slides = 3;
} else if (width <= 760 && width > 550) {
  slides = 2;
} else if (width <= 550) {
  slides = 1;
}

const mySwiper = new Swiper('.swiper-container', {
  direction: 'horizontal',
  loop: false,
  slidesPerView: slides,

  navigation: {
    nextEl: '.swiper-button-next',
    prevEl: '.swiper-button-prev',
  },

});

export default mySwiper;
