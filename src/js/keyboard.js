const keysRus = ['ё', '1', '2', '3', '4', '5', '6', '7', '8', '9', '0', '-', '=', 'Backspace', 'Ru/Eng', 'й', 'ц', 'у',
  'к', 'е', 'н', 'г', 'ш', 'щ', 'з', 'х', 'ъ', '\\', 'Del', 'CapsLock', 'ф', 'ы', 'в', 'а', 'п', 'р', 'о',
  'л', 'д', 'ж', 'э', 'Enter', 'Shift', 'я', 'ч', 'с', 'м', 'и', 'т', 'ь', 'б', 'ю', '.', '▲',
  'Shift', 'Ctrl', 'Win', 'Alt', ' ', 'Alt', '◄', '▼', '►', 'Ctrl'];

const keysRusShift = ['Ё', '!', '"', '№', ';', '%', ':', '?', '*', '(', ')', '_', '+', 'Backspace', 'Ru/Eng', 'Й', 'Ц', 'У',
  'К', 'Е', 'Н', 'Г', 'Ш', 'Щ', 'З', 'Х', 'Ъ', '/', 'Del', 'CapsLock', 'Ф', 'Ы', 'В', 'А', 'П', 'Р', 'О',
  'Л', 'Д', 'Ж', 'Э', 'Enter', 'Shift', 'Я', 'Ч', 'С', 'М', 'И', 'Т', 'Ь', 'Б', 'Ю', ',', '▲',
  'Shift', 'Ctrl', 'Win', 'Alt', ' ', 'Alt', '◄', '▼', '►', 'Ctrl'];

const keysEng = ['`', '1', '2', '3', '4', '5', '6', '7', '8', '9', '0', '-', '=', 'Backspace', 'Ru/Eng', 'q', 'w', 'e',
  'r', 't', 'y', 'u', 'i', 'o', 'p', '[', ']', '\\', 'Del', 'CapsLock', 'a', 's', 'd', 'f', 'g', 'h', 'j',
  'k', 'l', ';', '\'', 'Enter', 'Shift', 'z', 'x', 'c', 'v', 'b', 'n', 'm', ',', '.', '/', '▲',
  'Shift', 'Ctrl', 'Win', 'Alt', ' ', 'Alt', '◄', '▼', '►', 'Ctrl'];

const keysEngShift = ['~', '!', '@', '#', '$', '%', '^', '&', '*', '(', ')', '_', '+', 'Backspace', 'Ru/Eng', 'Q', 'W', 'E',
  'R', 'T', 'Y', 'U', 'I', 'O', 'P', '{', '}', '|', 'Del', 'CapsLock', 'A', 'S', 'D', 'F', 'G', 'H', 'J',
  'K', 'L', ':', '"', 'Enter', 'Shift', 'Z', 'X', 'C', 'V', 'B', 'N', 'M', '<', '>', '?', '▲',
  'Shift', 'Ctrl', 'Win', 'Alt', ' ', 'Alt', '◄', '▼', '►', 'Ctrl'];

const keyCodes = {
  192: 0,
  49: 1,
  50: 2,
  51: 3,
  52: 4,
  53: 5,
  54: 6,
  55: 7,
  56: 8,
  57: 9,
  48: 10,
  189: 11,
  187: 12,
  8: 13,
  9: 14,
  81: 15,
  87: 16,
  69: 17,
  82: 18,
  84: 19,
  89: 20,
  85: 21,
  73: 22,
  79: 23,
  80: 24,
  219: 25,
  221: 26,
  220: 27,
  46: 28,
  20: 29,
  65: 30,
  83: 31,
  68: 32,
  70: 33,
  71: 34,
  72: 35,
  74: 36,
  75: 37,
  76: 38,
  186: 39,
  222: 40,
  13: 41,
  161: 42,
  90: 43,
  88: 44,
  67: 45,
  86: 46,
  66: 47,
  78: 48,
  77: 49,
  188: 50,
  190: 51,
  191: 52,
  38: 53,
  162: 54,
  171: 55,
  911: 56,
  181: 57,
  32: 58,
  182: 59,
  37: 60,
  40: 61,
  39: 62,
  172: 63,
};

function renderLayout(keys) {
  const textarea = '<textarea class="textarea form-control" id="textarea" rows="1" placeholder="search"></textarea>';
  const layout = `<div class="container-keyboard disable"></div><div class="disable text">
  change lang click <span class="selection">[Ru\\Eng]</span> or left Ctrl + Alt</div>`;
  const formGroup = document.querySelector('.form-group');
  formGroup.innerHTML = textarea + formGroup.innerHTML;
  document.querySelector('.field').innerHTML += layout;
  const container = document.querySelector('.container-keyboard');
  const text = document.querySelector('.text');

  keys.forEach((key, id) => {
    const spanKey = (key.length === 1) ? `<span class='key symbol-key' id='k${id}'>${key}</span>`
      : `<span class='key functional-key'id='k${id}'>${key}</span>`;


    container.innerHTML += spanKey;
  });

  document.querySelector('.keyboard').addEventListener('click', () => {
    container.classList.toggle('disable');
    text.classList.toggle('disable');
    document.querySelector('.swiper-container').classList.toggle('shadow');
  });

  document.querySelector('#k14').classList.add('selection');
}


if (localStorage.getItem('lang') == null || localStorage.getItem('lang') === 'rus') {
  renderLayout(keysRus);
  localStorage.setItem('lang', 'rus');
} else {
  renderLayout(keysEng);
}


const keysDomElem = document.querySelectorAll('.key');
const textarea = document.querySelector('.textarea');

function addText(key, arr = [...textarea.innerHTML], start = textarea.selectionStart) {
  arr.splice(start, 0, key);
  textarea.innerHTML = arr.join('');
  textarea.selectionStart = start + 1;
}

function deleteText(key, arr = [...textarea.innerHTML], start = textarea.selectionStart,
  end = textarea.selectionEnd) {
  const flag = (key === 'Del') ? 0 : 1;

  const amountRemoveSymbol = end - start;
  if (amountRemoveSymbol) {
    arr.splice(start, amountRemoveSymbol);
    textarea.innerHTML = arr.join('');
    textarea.selectionStart = start;
  } else if (!(start === 0 && flag)) {
    arr.splice(start - flag, 1);
    textarea.innerHTML = arr.join('');
    textarea.selectionStart = start - flag;
  }
}


function capsLock() {
  const keys = document.querySelectorAll('.symbol-key');
  if (keys[18].innerHTML === keys[18].innerHTML.toLowerCase()) {
    document.querySelector('#k29').classList.add('active');
    [...keys].forEach((elem) => {
      const key = elem;
      key.innerHTML = key.innerHTML.toUpperCase();
    });
  } else {
    document.querySelector('#k29').classList.remove('active');
    [...keys].forEach((elem) => {
      const key = elem;
      key.innerHTML = key.innerHTML.toLowerCase();
    });
  }
}

function moveCursor(id) {
  const cursor = textarea.selectionStart;
  if (id === 'k60') {
    if (cursor > 0) {
      textarea.selectionStart = cursor - 1;
      textarea.selectionEnd = cursor - 1;
    }
  } else if (cursor < textarea.value.length) {
    textarea.selectionStart = cursor + 1;
    textarea.selectionEnd = cursor + 1;
  }
}

function inputText(key, event) {
  if (event.code === 'CapsLock') capsLock();
  if (keysDomElem[key].id === 'k60' || keysDomElem[key].id === 'k62') {
    moveCursor(keysDomElem[key].id);
  } else if (keysDomElem[key].classList.contains('symbol-key') && keysDomElem[key].id !== 'k58') {
    addText(keysDomElem[key].innerText);
  } else if (keysDomElem[key].id === 'k58') {
    addText(' ');
  } else if (keysDomElem[key].innerHTML === 'Ru/Eng') {
    changeLang();
  } else if (
    (keysDomElem[key].innerHTML === 'Del' && textarea.innerHTML)
    || (keysDomElem[key].innerHTML === 'Backspace' && textarea.innerHTML)
  ) {
    deleteText(keysDomElem[key].innerHTML);
  }
}

function turningOn() {
  const keys = document.querySelectorAll('.key');
  if (localStorage.getItem('lang') === 'rus') {
    [...keys].forEach((elem, index) => {
      const key = elem;
      key.innerHTML = keysRusShift[index];
    });
  } else {
    [...keys].forEach((elem, index) => {
      const key = elem;
      key.innerHTML = keysEngShift[index];
    });
  }
}

function turningOff() {
  const keys = document.querySelectorAll('.key');
  if (localStorage.getItem('lang') === 'rus') {
    [...keys].forEach((elem, index) => {
      const key = elem;
      key.innerHTML = keysRus[index];
    });
  } else {
    [...keys].forEach((elem, index) => {
      const key = elem;
      key.innerHTML = keysEng[index];
    });
  }
}

function shift(key, type) {
  if (key === 'Shift' && type === 'keydown') {
    document.querySelector('#k29').classList.remove('active');
    turningOn();
  } else if (key === 'Shift' && type === 'keyup') {
    document.querySelector('#k29').classList.remove('active');
    turningOff();
  }
}

function toggleClassOpacity(event) {
  event.preventDefault();


  const keywordId = (event.location) ? keyCodes[`${event.keyCode}${event.location}`] : keyCodes[event.keyCode];
  if (event.type === 'keydown' && keysDomElem[keywordId] !== undefined) {
    shift(event.key, event.type);
    keysDomElem[keywordId].classList.add('animation');
    inputText(keywordId, event);
  } else if (keysDomElem[keywordId] !== undefined) {
    shift(event.key, event.type);
    keysDomElem[keywordId].classList.remove('animation');
  }
}

window.addEventListener('keydown', toggleClassOpacity);

window.addEventListener('keyup', toggleClassOpacity);


document.querySelector('.container-keyboard').addEventListener('click', (event) => {
  if (event.target.classList.contains('key')) {
    const id = event.target.id.substring(1);
    inputText(id, event);
    event.target.classList.add('animation');
    setTimeout(() => {
      event.target.classList.remove('animation');
    }, 100);
  }

  if (event.target.id === 'k29') {
    capsLock();
    // event.target.classList.toggle('active');
  }

  const temp = document.querySelector('#k43');
  if (event.target.id === 'k42' || event.target.id === 'k54') {
    if (temp.innerHTML === temp.innerHTML.toLowerCase()) {
      turningOn();
    } else turningOff();
    document.querySelector('#k29').classList.remove('active');
  }

  textarea.focus();
});


function toggleLang(func, ...codes) {
  const pressed = new Set();

  window.addEventListener('keydown', (event) => {
    pressed.add(event.code);

    // eslint-disable-next-line no-restricted-syntax
    for (const code of codes) {
      if (!pressed.has(code)) {
        return;
      }
    }

    pressed.clear();

    func();
  });

  window.addEventListener('keyup', (event) => {
    pressed.delete(event.code);
  });
}

function changeLang() {
  const keys = document.querySelectorAll('.key');
  if (localStorage.getItem('lang') === 'rus') {
    [...keys].forEach((elem, index) => {
      const key = elem;
      key.innerHTML = keysEng[index];
    });
    localStorage.setItem('lang', 'eng');
  } else {
    [...keys].forEach((elem, index) => {
      const key = elem;
      key.innerHTML = keysRus[index];
    });
    localStorage.setItem('lang', 'rus');
  }
}

toggleLang(
  () => changeLang(),
  'ControlLeft',
  'AltLeft',
);
