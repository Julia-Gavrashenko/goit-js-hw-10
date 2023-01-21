import './css/styles.css';
import Notiflix from 'notiflix';
import { fetchCountries } from './fetchCountries';

const debounce = require('lodash.debounce');
const DEBOUNCE_DELAY = 300;

const inputEl = document.querySelector(`#search-box`);
const listEl = document.querySelector(`.country-list`);
const searchedCountry = document.querySelector(`.country-info`);

inputEl.addEventListener('input', debounce(onFormElInput, DEBOUNCE_DELAY));


function onFormElInput(event) {
  const inputValue = event.target.value.trim();

  if (!inputValue) {
    clearMarkup();
    return;
  }

  fetchCountries(inputValue)
    .then(data => displayMarkup(data))
    .catch(error => onError());
}


function displayMarkup(data) {
  if (data.length > 10) {
    Notiflix.Notify.info(
      'Too many matches found. Please enter a more specific name.'
    );
    clearMarkup();
    return;
  }

  if (data.length > 2) {
    searchedCountry.innerHTML = '';
    createListMarkup(data);
  } else {
    listEl.innerHTML = '';
    createCountryMarkup(data);
  }
}


function onError() {
  clearMarkup();
  Notiflix.Notify.failure('Oops, there is no country with that name');
}


function clearMarkup() {
  searchedCountry.innerHTML = '';
  listEl.innerHTML = '';
}


function createListMarkup(arr) {
  const listMarkup = arr
    .map(
      ({
        name: { official },
        flags: { svg },
      }) => `<li class = "country-list_el">
<img src="${svg}" alt="The flsg of ${official}" width="60px" height="40px">
<h2>${official}</h2>
</li>`
    )
    .join('');

  listEl.innerHTML = listMarkup;
  listEl.style.listStyle = 'none';
}


function createCountryMarkup(arr) {
  const countryMarkup = arr
    .map(
      ({
        name: { official },
        flags: { svg },
        capital,
        population,
        languages,
      }) => `<div class = "country">
<img src="${svg}" alt="The flag of ${official}" width="70px" height="50px">
<h1>${official}</h1></div>
<p class = "desc">Capital: ${capital}</p>
<p class = "desc">Population: ${population}</p>
<p class = "desc">Languages: ${Object.values(languages)}</p>
`
    )
    .join('');

  searchedCountry.innerHTML = countryMarkup;
}
