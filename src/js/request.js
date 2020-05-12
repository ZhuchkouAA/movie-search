window.page = 1;

function makeRequest(url) {
  document.querySelector('.swiper-lazy-preloader').classList.remove('disable');
  return fetch(url)
    .then((res) => res.json());
}

export default makeRequest
