const countryList = document.querySelector('.country-list');
const countryInfo = document.querySelector('.country-info');

const searchBox = document.querySelector('#search-box');

const counties = fetchCountries();

function fetchCountries() {
  return fetch('https://restcountries.com/v3.1/all?fields=name,flags').then(
    response => {
      if (!response.ok) {
        throw new Error(response.status);
      }
      return response.json();
    }
  );
}

function renderCountries(countries, filterText) {
  console.log('TEST : L ' + countries.length);
  let counter = 0;
  const markup = countries
    .map(country => {
      if (filterText.length == 0) return '';
      else if (
        country.name.common.toUpperCase().includes(filterText.toUpperCase())
      ) {
        counter++;
        return `
            <li>
              <p><img src="${country.flags.png}" alt="${country.flags.alt} width="25" height="15"\>  ${country.name.common}</p>           
            </li>`;
      } else return '';
    })
    .join('');
  if (counter == 0) {
    countryList.innerHTML = '';
    countryInfo.innerHTML = '<p> Brak wynikow</p>';
  } else if (counter == 1) {
    countryList.innerHTML = markup;
    countryInfo.innerHTML = '';
  } else if (counter < 10) {
    countryList.innerHTML = markup;
    countryInfo.innerHTML = '';
  } else {
    countryList.innerHTML = '';
    countryInfo.innerHTML = '<p> Za duzo wynikow</p>';
  }
}

searchBox.addEventListener('input', event => {
  ''.toUpperCase;
  counties
    .then(countries => renderCountries(countries, event.target.value))
    .catch(error => console.log(error));
});
