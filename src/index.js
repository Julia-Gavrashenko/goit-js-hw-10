import './css/styles.css';
import Notiflix from 'notiflix';


const debounce = require('lodash.debounce');
const DEBOUNCE_DELAY = 300;

const inputEl = document.querySelector(`#search-box`);
const listEl = document.querySelector(`.country-list`);
const searchedCountry = document.querySelector(`.country-info`);

// console.log(inputEl)

inputEl.addEventListener('input', onFormElInput);

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
  const inputValue = event.currentTarget.value.trim();

  if (inputValue === '') {
    return;
  }

  fetchCountries(inputValue)
    .then(data => {
      console.log(data);

      if (data.length > 10) {
        Notiflix.Notify.info(
          'Too many matches found. Please enter a more specific name.'
        );
      }
        if (data.length === 1) {
          createCountryMarkup(data);
        }
       else {
        createListMarkup(data);
      }
    })
    .catch(error =>
      Notiflix.Notify.failure('Oops, there is no country with that name')
    );
}



function createListMarkup(arr) {
  const listMarkup = arr
    .map(
      ({ name: { official }, flags: { svg } }) => `<li>
<img src="${svg}" alt="The flsg of ${official}" width="60px" height="50px">
<h2>${official}</h2>
</li>`
    )
    .join('');

  listEl.insertAdjacentHTML('beforeend', listMarkup);
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
      }) => `
<img src="${svg}" alt="The flag of ${official}" width="60px" height="50px">
<h1>${official}</h1>
<p>Capital: ${capital}</p>
<p>Population: ${population}</p>
<p>Languages: ${Object.values(languages)}</p>
`
    )
    .join('');

  searchedCountry.insertAdjacentHTML('beforeend', countryMarkup);
}





