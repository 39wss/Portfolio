'use strict';

(() => {
  const txtElems = document.querySelectorAll('.content_txt');
const imgElems = document.querySelectorAll('.content__img');
let currentItem = imgElems[0];
let ioIndex;

const io = new IntersectionObserver((entries, observer) => {
  ioIndex = entries[0].target.dataset.index * 1;
});

for (let i = 0; i < txtElems.length; i++) {
  io.observe(txtElems[i]);
  txtElems[i].dataset.index = i;
  imgElems[i].dataset.index = i;
}

function activate(action) {
  currentItem.classList.add('visible')
  if (action) {
    actions[action](true);
  }
}

function inactivate(action) {
  currentItem.classList.remove('visible')
  if (action) {
    actions[action](false);
  }
}

window.addEventListener('scroll', () => {
  let txt;
  let boundimgRect;
  let temp = 0;

  for (let i = ioIndex - 1; i < ioIndex + 2; i++) {
    txt = txtElems[i];
    if(!txt) continue;
    boundimgRect = txt.getBoundingClientRect();

    temp++;

    if (boundimgRect.top > window.innerHeight * 0.1 &&
        boundimgRect.top < window.innerHeight * 0.8) {
          inactivate();
          currentItem = imgElems[txt.dataset.index];
          activate(currentItem.dataset.action);
        }
  }
});

window.addEventListener('load', () => {
  setTimeout(() => scrollTo(0,0), 100);
  });

  activate();

})();
