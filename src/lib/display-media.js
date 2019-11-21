// todo vísa í rétta hluti með import
import getRandomImage from './nasa-api';
import { empty, el } from './helpers';
import { save, load, clear } from './storage';

// breytur til þess að halda utan um html element nodes
let title; // titill fyrir mynd á forsíðu
let text; // texti fyrir mynd á forsíðu
let img; // mynd á forsíðu

let image; // object sem inniheldur núverandi mynd á forsíðu.

let container;
/*
 * Sækir nýja Mynd af handahófi frá Nasa API og birtir hana á forsíðunni
 * ásamt titli og texta.
 */
function getNewImage() {
  getRandomImage().then((data) => {
    image = data;
    title = container.querySelector('.apod__title');
    text = container.querySelector('.apod__text');
    img = container.querySelector('.apod__image');
    empty(title);
    empty(text);
    title.appendChild(document.createTextNode(image.title));
    text.appendChild(document.createTextNode(image.explanation));
    if (image.media_type === 'video') {
      const video = el('iframe');
      video.setAttribute('height', 'auto');
      video.setAttribute('width', 'auto');
      video.src = image.url;
      container.insertBefore(video, img);
      container.removeChild(img);
    } else {
      img.src = image.url;
    }
  }).catch((err) => {
    // eslint-disable-next-line no-console
    console.error('Þú fékkst villu', err);
  });
}

/*
 * Vistar núverandi mynd í storage.
 */
function saveCurrentImage() {
  save(image.media_type, image.url, image.explanation, image.title);
}

/*
 * Upphafsstillir forsíðuna. Setur event listeners á takkana, og sækir eina mynd.
 *
 */
export default function init(apod) {
  container = apod;
  const takkar = apod.querySelectorAll('.button');
  takkar[0].addEventListener('click', getNewImage);
  takkar[1].addEventListener('click', saveCurrentImage);
  getNewImage();
}

/*
 * Fall fyrir favourites.html. Sér um að sækja allar vistuðu myndirnar og birta þær ásamt
 * titlum þeirra.
 */
export function loadFavourites() {
  const data = load();
  for (let i = 0; i < data.length; i += 1) {
    let mynd;
    if (data[i].type === 'video') {
      mynd = el('iframe');
      mynd.setAttribute('height', 'auto');
      mynd.setAttribute('width', 'auto');
    } else {
      mynd = el('img');
    }
    mynd.classList.add('apod__image');
    mynd.src = data[i].mediaUrl;
    const titill = el('h2');
    titill.classList.add('apod__title');
    titill.appendChild(document.createTextNode(data[i].title));
    const parent = el('section', titill, mynd);
    parent.classList.add('apod');
    const con = document.querySelector('main');
    con.appendChild(parent);
  }
}
