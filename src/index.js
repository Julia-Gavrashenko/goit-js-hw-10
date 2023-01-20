import './css/styles.css';
import Notiflix from 'notiflix';

const debounce = require('lodash.debounce');
const DEBOUNCE_DELAY = 300;

const inputEl = document.querySelector(`#search-box`);
const listEl = document.querySelector(`country-list`);
const searchedCountry = document.querySelector(`country-info`);

// console.log(inputEl)

inputEl.addEventListener(`input`, debounce(onFormElInput, DEBOUNCE_DELAY));

function fetchCountries(name) {
  const BASE_URL = `https://restcountries.com/v3.1/name/${name}`;
  return fetch(
    `${BASE_URL}?fields=name,flags,capital,population,languages`
  ).then(responce => {
    if (!responce.ok) {
      throw new Error(responce.statusText);
    }
    console.log(responce);

    return responce.json();
  });
}



function onFormElInput(event) {
  // console.log(event.currentTarget.value);

  const inputValue = event.currentTarget.value.trim();

  if (inputValue) {
    fetchCountries(inputValue).then(data => console.log(data));
  } else{
    // remove list
  }
}


function createMarkup(arr) {
const markup = arr.map( el => `<li>${el.name}</li>`);

// listEl.
}