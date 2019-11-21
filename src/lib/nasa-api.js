import { randomDate } from './helpers';

/**
 * Sækir Myndir frá nasa API. Til þess að sjá dæmi um json svari sjá apod.json
 */

// API lykill til að fá aðgang að nasa gögnum.
const API_KEY = 'I3IZB6owFJuCV3ZiUMnr18L1x4ycJYFqGKKyCHiF';
// Slóð að sækja myndir frá. Dæmi um heila slóð https://api.nasa.gov/planetary/apod?api_key=DEMO_KEY&date=2019-11-10
const URL = 'https://api.nasa.gov/planetary/apod?api_key=';


/**
 * Sækir mynd af handahófi frá APOD API hjá nasa
 *
 * @returns {Promise} sem mun innihalda upplýsingar um mynd/myndband hjá nasa.
 */
export default async function getRandomImage() {
  const date = randomDate(new Date(1995, 5, 16), new Date());
  return fetch(`${URL}${API_KEY}&date=${date}`)
    .then((response) => {
      if (!response.ok) {
        throw new Error('Villa kom upp');
      }
      return response.json();
    });
}
