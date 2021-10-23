'use strict';

const inputEl = document.querySelector('.btn-country');
const images = document.querySelector('.images');
const countriesContainer = document.querySelector('.countries');
const btnEl = document.querySelector('.btn');
///////////////////////////////////////

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
const renderErr = err => {
  countriesContainer.insertAdjacentText('afterend', `${err.message} 💥💥💥`);
  console.log(`${err.message}`);
};

const getInfo = () => {
  const userChoice = inputEl.value;
  if (!userChoice) return alert('please enter any Name');

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

const CreateImg = function (imgPath) {
  return new Promise(function (resolve, reject) {
    const img = document.createElement('img');
    img.src = imgPath;

    img.addEventListener('load', () => {
      images.prepend(img);
      resolve(img);
    });
    img.addEventListener('error', function () {
      reject(new Error('img not found'));
    });
  });
};

let currentImg;
CreateImg('./img/img-1.jpg')
  .then(img => {
    console.log('img 1 loaded');
    currentImg = img;
    return wait(2);
  })
  .then(() => {
    currentImg.style.display = 'none';
    return wait(2);
  })
  .then(() => {
    return CreateImg('./img/img-2.jpg');
  })
  .then(img => {
    console.log('img 2 loaded');
    currentImg = img
    return wait(2);
  })
  .then(() => {
    currentImg.style.display = 'none';
    return wait(2);
  })
  .then(() => {
    return CreateImg('./img/img-3.jpg');
  })
  .then(img => {
    currentImg = img
    console.log('img 2 loaded');
    return wait(2);
  }) 
  .then(() => {
    currentImg.style.display = 'none';
  })
  .catch(err => {
    console.log(err);
  });

const getLocation = function () {
  return new Promise((resolve, reject) => {
    navigator.geolocation.getCurrentPosition(resolve, reject);
  });
};

getLocation().then(pos => console.log(pos));

btnEl.addEventListener('click', getInfo);
btnEl.addEventListener('click', getLocation);

/////////////////////////////
const wait = function (seconds) {
  return new Promise(resolve => {
    setTimeout(resolve, seconds * 1000);
  });
};

wait(1)
  .then(() => {
    console.log('I waited for 1 second');
    return wait(1);
  })
  .then(() => {
    console.log('I waited for 2 second');
    return wait(1);
  })
  .then(() => {
    console.log('I waited for 3 second');
    return wait(1);
  })
  .then(() => {
    console.log('I waited for 4 second');
    return wait(1);
  })
  .then(() => {
    console.log('I waited for 5 second');
    return wait(1);
  });

const lotteryPromis = new Promise((resolve, reject) => {
  console.log('Draw is happining');
  setTimeout(() => {
    if (Math.random() >= 0.5) {
      resolve('You win 😎');
    } else {
      reject(new Error('You Lost the Bet'));
    }
  }, 2000);
});
lotteryPromis.then(res => console.log(res)).catch(err => console.log(err));

// const request = new XMLHttpRequest();
// request.open('GET', `https://restcountries.com/v2/name/${userChoice}`);
// request.send();

// request.addEventListener('load', () => {
//   const [country] = JSON.parse(request.responseText);
//   console.log(country);

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
