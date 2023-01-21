export function fetchCountries(name) {
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
