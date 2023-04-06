const countryList = document.querySelector('.country-list');
const countryInfo = document.querySelector('.country-info');

const searchBox = document.querySelector('#search-box');

const counties = fetchCountries();

function fetchCountries() {
  return fetch(
    'https://restcountries.com/v3.1/all?fields=name,flags,capital,population,languages'
  ).then(response => {
    if (!response.ok) {
      throw new Error(response.status);
    }
    return response.json();
  });
}

function renderCountries(countries, filterText) {
  if (filterText.length == 0) {
    countryList.innerHTML = '';
    countryInfo.innerHTML = '<p> Brak wynikow</p>';
  } else {
    const filteredCountry = countries.filter(country =>
      country.name.common.toUpperCase().includes(filterText.toUpperCase())
    );
    const filteredCountryLength = filteredCountry.length;
    if (filteredCountryLength < 10) {
      const markup = filteredCountry
        .map(country => {
          if (filteredCountryLength == 1) {
            var langList = '';
            const languagesMapValues = new Map(
              Object.entries(country.languages)
            );
            languagesMapValues.forEach((value, key) => {
              langList += `${value}, `;
            });
            if (langList.length != 0)
              langList = langList.substring(0, langList.length - 2);
            return `
            <li class="item">
              <h1><img src="${country.flags.png}" alt="${country.flags.alt} width="50" height="30"\>  ${country.name.common}</h1>
              <p><b>Capital</b>: ${country.capital[0]}</p>
              <p><b>Population</b>: ${country.population}</p>
              <p><b>Languages</b>: ${langList}</p>
            </li>
            `;
          } else
            return `
              <li>
                <p><img src="${country.flags.png}" alt="${country.flags.alt} width="25" height="15"\>  ${country.name.common}</p>           
              </li>`;
        })
        .join('');
      if (filteredCountryLength == 1) {
        countryList.innerHTML = markup;
        countryInfo.innerHTML = '';
      } else if (filteredCountryLength < 10) {
        countryList.innerHTML = markup;
        countryInfo.innerHTML = '';
      }
    } else {
      countryList.innerHTML = '';
      countryInfo.innerHTML = '<p> Za duzo wynikow</p>';
    }
  }
}

searchBox.addEventListener('input', event => {
  ''.toUpperCase;
  counties
    .then(countries => renderCountries(countries, event.target.value))
    .catch(error => console.log(error));
});
