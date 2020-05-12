import makeRequest from './request';
import { requestFilms } from './renderSlides';

window.apiKey = 'trnsl.1.1.20200508T115458Z.f858c926c4aeb756.c6744a1ebf669f59c14f93c53ae668fc4fa6b239';

function renderSearchQuery(text) {
  if (text.length === 0) {
    document.querySelector('.result-searching').innerHTML = 'Enter text to search';
    return;
  }
  window.currentRequestText = text;
  window.page = 1;
  requestFilms('true');
}

function translateTextRuEng() {
  const reg = /[а-яА-ЯёЁ]/;
  const text = document.querySelector('.form-control').value;
  if (reg.test(text)) {
    const urlTranslate = `https://translate.yandex.net/api/v1.5/tr.json/translate?key=${window.apiKey}&text=${text}&lang=ru-en`;
    makeRequest(urlTranslate)
      .then((res) => {
        renderSearchQuery(res.text[0]);
      });
  } else {
    renderSearchQuery(text);
  }
}

document.querySelector('.search').addEventListener('click', translateTextRuEng);
document.querySelector('.textarea').addEventListener('keydown', (e) => {
  if (e.code === 'Enter') {
    translateTextRuEng();
  }
});
document.querySelector('#k41').addEventListener('click', translateTextRuEng);
