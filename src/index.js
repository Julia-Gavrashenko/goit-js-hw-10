import './css/styles.css';
import Notiflix from 'notiflix';

const debounce = require('lodash.debounce');
const DEBOUNCE_DELAY = 300;

function fetchCountries() {
  const BASE_URL = `https://restcountries.com/v3.1/all`;
  return fetch(`${BASE_URL}?fields=name,capital,population,languages,flags`).then(
    responce => {
      if (!responce.ok) {
        throw new Error(responce.statusText);
      }
      //   console.log(responce);

      return responce.json();
    }
  );
}

fetchCountries().then(data => console.log(data));


function createMarkup(data) {
    
}
