'use strict';

const inputEl = document.querySelector('.btn-country');
const countriesContainer = document.querySelector('.countries');
const btnEl = document.querySelector('.btn');
///////////////////////////////////////

// const request = new XMLHttpRequest();
// request.open('GET', 'https://restcountries.eu/rest/v2/name/Colombia');
// request.send();

// request.addEventListener('load', () => {
//   const data = request.responseText;
//   console.log('logging data', data);
// });
const renderEl = (country, className) => {
  const html = `
  <article class="country ${className}">
    <img class="country__img" src="${country.flag}" />
    <div class="country__data">
      <h3 class="country__name">${country.name}</h3>
      <p class="country__row"><span>👫</span>${(
        country.population / 1000000
      ).toFixed(1)}M</p>
      <p class="country__row"><span>🗣️</span>${country.languages[0].name}</p>
      <p class="country__row"><span>💰</span>${country.currencies[0].name}</p>
    </div>
  </article>`;
  countriesContainer.insertAdjacentHTML('beforeend', html);
  countriesContainer.style.opacity = 1;
};

const getInfo = () => {
  const userChoice = inputEl.value;
  if (!userChoice) return alert('please enter any Name');

  // const request = new XMLHttpRequest();
  // request.open('GET', `https://restcountries.com/v2/name/${userChoice}`);
  // request.send();

  // request.addEventListener('load', () => {
  //   const [country] = JSON.parse(request.responseText);
  //   console.log(country);

  fetch(`https://restcountries.com/v2/name/${userChoice}`)
    .then(response => response.json())
    .then(data => {
      const [country] = data;
      renderEl(country);
      inputEl.value = '';
      console.log(country);

      const neighbour = country.borders[0];
      console.log(neighbour);

      if (!neighbour) return;

      return fetch(`https://restcountries.com/v2/alpha/${neighbour}`);
    })
    .then(response => response.json())
    .then(data => {
      renderEl(data, 'neighbour');
      console.log(data);
    });
};

// fetch(`https://geek-jokes.sameerkumar.website/api?format=json`)
//   .then(response => response.json())
//   .then(data => {
//     console.log(data);
//     const fJoke = data.joke;
//     console.log('1st joke: ', data.joke);
//     if (!fJoke) return;
//     return fetch(`https://geek-jokes.sameerkumar.website/api?format=json`);
//   });
//   .then(response => response.json())
//   .then(data => {
//     const sJoke = data.joke;
//     console.log('2nd joke: ', data.joke);
//     if (!sJoke) return;
//     return fetch(`https://geek-jokes.sameerkumar.website/api?format=json`);
//   })
//   .then(res => res.json())
//   .then(d => console.log('3rd joke: ', d.joke))
//   .catch(err => console.error(`could not load data ${err.message}`));

btnEl.addEventListener('click', getInfo);
