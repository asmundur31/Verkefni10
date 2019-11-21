/**
 * Sækir og vistar í localStorage
 */

// Fast sem skilgreinir heiti á lykli sem vistað er undir í localStorage
const LOCALSTORAGE_KEY = 'favourite_spacephotos';

/**
 * Sækir gögn úr localStorage. Skilað sem lista á forminu:
 * [{ type, mediaUrl, text, title },
 *  { type, mediaUrl, text, title },
 *  ...,
 *  { type, mediaUrl, text, title }]
 *
 * @returns {array} fylki af myndum eða tóma fylkið ef ekkert vistað.
 */
export function load() {
  const data = JSON.parse(window.localStorage.getItem(LOCALSTORAGE_KEY)) || [];
  return data;
}

/**
 * Vistaðar myndir með texta.
 *
 * @param {string} type annað hvort image eða video
 * @param {string} mediaUrl URL á myndinni/myndbandinu.
 * @param {string} text texti fyrir myndina/myndbandið.
 * @param {string} title titill fyrir myndina/myndbandið.
 */
export function save(type, mediaUrl, text, title) {
  let saved = JSON.parse(window.localStorage.getItem(LOCALSTORAGE_KEY)) || [];
  const object = {
    'type': type,
    'mediaUrl': mediaUrl,
    'text': text,
    'title': title
  };
  if (saved === null) {
    saved = { object };
  } else {
    saved.push(object);
  }
  localStorage.setItem(LOCALSTORAGE_KEY, JSON.stringify(saved));
}


/**
 * Hreinsar allar myndir úr localStorage
 */
export function clear() {
  localStorage.removeItem(LOCALSTORAGE_KEY);
}
