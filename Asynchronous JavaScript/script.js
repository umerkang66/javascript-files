'use strict';

const btn = document.querySelector('.btn-country');
const countriesContainer = document.querySelector('.countries');
const imageContainer = document.querySelector('.images');

const renderCountry = function (data, className = '') {
  const html = `
    <article class="country ${className}">
        <img class="country__img" src="${data.flag}" />
        <div class="country__data">
            <h3 class="country__name">${data.name}</h3>
            <h4 class="country__region">${data.region}</h4>
            <p class="country__row"><span>👫</span>${(
              +data.population / 1000000
            ).toFixed(1)}m people</p>
            <p class="country__row"><span>🗣️</span>${data.languages[0].name}</p>
            <p class="country__row"><span>💰</span>${
              data.currencies[0].name
            }</p>
        </div>
    </article>
  `;

  countriesContainer.insertAdjacentHTML('beforeend', html);
  countriesContainer.style.opacity = 1;
};

const renderError = function (msg) {
  countriesContainer.insertAdjacentText('beforeend', msg);
  countriesContainer.style.opacity = 1;
};

const getJSON = function (url, errorMsg = 'something went wrong') {
  return fetch(url).then(response => {
    if (!response.ok) throw new Error(`${errorMsg} (${response.status})`);

    return response.json();
  });
};

///////////////////////////////////////
///////////////////////////////////////
/*
const getCountryData = function (country) {
  const request = new XMLHttpRequest();
  request.open('GET', `https://restcountries.eu/rest/v2/name/${country}`);
  request.send();

  request.addEventListener('load', function () {
    const [data] = JSON.parse(this.responseText);
    console.log(data);

    const html = `
    <article class="country">
        <img class="country__img" src="${data.flag}" />
        <div class="country__data">
            <h3 class="country__name">${data.name}</h3>
            <h4 class="country__region">${data.region}</h4>
            <p class="country__row"><span>👫</span>${(
              +data.population / 1000000
            ).toFixed(1)} people</p>
            <p class="country__row"><span>🗣️</span>${data.languages[0].name}</p>
            <p class="country__row"><span>💰</span>${
              data.currencies[0].name
            }</p>
        </div>
    </article>
  `;

    countriesContainer.insertAdjacentHTML('beforeend', html);
    countriesContainer.style.opacity = 1;
  });
};

getCountryData('portugal');
getCountryData('usa');
getCountryData('germany');
*/

///////////////////////////////////////
///////////////////////////////////////
// CALLBACK HELL
// rendering the cards on the dom

/*
const getCountryandNeighbour = function (country) {
  // AJAX CALL country 1
  const request = new XMLHttpRequest();
  request.open('GET', `https://restcountries.eu/rest/v2/name/${country}`);
  request.send();

  request.addEventListener('load', function () {
    const [data] = JSON.parse(this.responseText);
    console.log(data);

    // render country 1 on the dom function
    renderCountry(data);

    // get neighbour country 2
    const [neighbour] = data.borders;

    // guard clause
    if (!neighbour) return;

    // AJAX CALL country 2
    const request2 = new XMLHttpRequest();
    request2.open('Get', `https://restcountries.eu/rest/v2/alpha/${neighbour}`);
    request2.send();

    request2.addEventListener('load', function () {
      const data2 = JSON.parse(this.responseText);
      console.log(data2);

      // render country 2 on the dom function
      renderCountry(data2, 'neighbour');
    });
  });
};

getCountryandNeighbour('portugal');
*/

///////////////////////////////////////
///////////////////////////////////////
// PROMISES AND FETCH API

// const getCountryData = function (country) {
//   fetch(`https://restcountries.eu/rest/v2/name/${country}`)
//     .then(function (response) {
//       console.log(response);
//       return response.json();
//     })
//     .then(function (data) {
//       console.log(data);
//       renderCountry(data[0]);
//     });
// };

/*
const getJSON = function (url, errorMsg = 'something went wrong') {
  return fetch(url).then(response => {
    if (!response.ok) throw new Error(`${errorMsg} (${response.status})`);

    return response.json();
  });
};

const getCountryData = function (country) {
  getJSON(
    `https://restcountries.eu/rest/v2/name/${country}`,
    'Country not found'
  )
    .then(data => {
      renderCountry(data[0]);
      const neighbour = data[0].borders[0];

      if (!neighbour) throw new Error('No neighbour found');

      // return fetch(`https://restcountries.eu/rest/v2/alpha/${neighbour}`);

      return getJSON(
        `https://restcountries.eu/rest/v2/alpha/${neighbour}`,
        'Neighbour country not found'
      );
    })
    .then(neighbourData => renderCountry(neighbourData, 'neighbour'))
    .catch(err => {
      console.error(`${err} 💥💥💥`);
      renderError(`something went wrong 💥💥💥 ${err.message} `);
    })
    .finally(() => {
      countriesContainer.style.opacity = 1;
    });
};

btn.addEventListener('click', () => getCountryData('portugal'));

getCountryData('australia');

///////////////////////////////////////
///////////////////////////////////////
// CODING CHALLENGE #1

const getJSON = function (url, errorMsg = 'something went wrong') {
  return fetch(url).then(response => {
    if (!response.ok) throw Error(`${errorMsg}, ${response.status}`);

    return response.json();
  });
};

const getCountryData = function (country) {
  getJSON(
    `https://restcountries.eu/rest/v2/name/${country}`,
    'Country not found'
  )
    .then(data => {
      const [actualData] = data;
      console.log(actualData);
      renderCountry(actualData);

      // rendering the neighbouring country
      const neighbourCountry = actualData.borders[0];
      getJSON(
        `https://restcountries.eu/rest/v2/alpha/${neighbourCountry}`,
        'Country not found'
      )
        .then(data2 => {
          renderCountry(data2, 'neighbour');

          return data2;
        })
        .catch(err => {
          renderError(err);

          return err;
        });
      return actualData;
    })
    .catch(err => {
      renderError(err.message);
      return err;
    })
    .finally(() => {
      countriesContainer.style.opacity = 1;
    });
};

const whereAmI = function (lat, lng) {
  getJSON(`https://geocode.xyz/${lat},${lng}?geoit=json`, 'Place not found')
    .then(data => {
      // console.log(data);
      console.log(`You are in ${data.city}, ${data.country}`);
      getCountryData(data.country);
      return data;
    })
    .catch(err => {
      console.log(err.message);
      return err;
    });
};

whereAmI(52.508, 13.381);

console.log('Test start');
setTimeout(() => console.log('0 seconds passed'), 0);
Promise.resolve('Resolved promise 1').then(res => console.log(res));

Promise.resolve('Resolved promise 2').then(res => {
  console.log(res);
});

console.log('Test end');

///////////////////////////////////////
///////////////////////////////////////
// BUILDING A SIMPLE PROMISE

const lotteryPromise = new Promise(function (resolve, reject) {
  console.log('Lottery draw is happening');
  setTimeout(() => {
    if (Math.random() >= 0.5) {
      resolve('you WIN 🏆');
    } else {
      reject(new Error('you lose your money 💩'));
    }
  }, 2000);
});

lotteryPromise.then(res => console.log(res)).catch(err => console.error(err));

// Promosifying setTimeOut function
const wait = seconds =>
  new Promise(resolve => setTimeout(resolve, seconds * 1000));

wait(1)
  .then(() => {
    console.log('1 second passed');
    return wait(1);
  })
  .then(() => {
    console.log('2 seconds passed');
    return wait(1);
  })
  .then(() => {
    console.log('3 seconds passed');
    return wait(1);
  })
  .then(() => console.log('4 seconds passed'));

Promise.resolve('abc').then(x => console.log(x));
Promise.reject(new Error('PROBLEM!')).catch(x => console.error(x));

///////////////////////////////////////
///////////////////////////////////////
// PROMISIFYING THE GEOLOCATION API

// navigator.geolocation.getCurrentPosition(
//   position => console.log(position),
//   err => console.error(err)
// );

const getPosition = function () {
  return new Promise(function (resolve, reject) {
    navigator.geolocation.getCurrentPosition(resolve, reject);
  });
};

const getJSON = function (url, errorMsg = 'something went wrong') {
  return fetch(url).then(response => {
    if (!response.ok) throw Error(`${errorMsg}, ${response.status}`);

    return response.json();
  });
};

const getCountryData = function (country) {
  getJSON(
    `https://restcountries.eu/rest/v2/name/${country}`,
    'Country not found'
  )
    .then(data => {
      const [actualData] = data;
      console.log(actualData);
      renderCountry(actualData);

      // rendering the neighbouring country
      const neighbourCountry = actualData.borders[0];
      getJSON(
        `https://restcountries.eu/rest/v2/alpha/${neighbourCountry}`,
        'Country not found'
      )
        .then(data2 => {
          renderCountry(data2, 'neighbour');

          return data2;
        })
        .catch(err => {
          renderError(err);

          return err;
        });
      return actualData;
    })
    .catch(err => {
      renderError(err.message);
      return err;
    })
    .finally(() => {
      countriesContainer.style.opacity = 1;
    });
};

const whereAmI = function () {
  getPosition()
    .then(pos => {
      // const { latitude: lat, longitude: lng } = pos.coords;
      const lat = 37.0475008;
      const lng = -7.8381056;
      return getJSON(
        `https://geocode.xyz/${lat},${lng}?geoit=json`,
        'Place not found'
      );
    })
    .then(data => {
      // console.log(data);
      console.log(`You are in ${data.city}, ${data.country}`);
      getCountryData(data.country);
      return data;
    })
    .catch(err => {
      console.log(err.message);
      return err;
    });
};

btn.addEventListener('click', whereAmI);

///////////////////////////////////////
///////////////////////////////////////
// CODING CHALLENGE #2

const img1 = 'img/img-1.jpg';
const img2 = 'img/img-2.jpg';

const wait = seconds =>
  new Promise(resolve => setTimeout(resolve, seconds * 1000));

let img;

const createImage = function (imgPath) {
  return new Promise(function (resolve, reject) {
    img = document.createElement('img');
    img.src = imgPath;

    img.addEventListener('load', function () {
      console.log(img);

      wait(2).then(() => {
        imageContainer.append(img);
        resolve(img);
      });

      wait(4).then(() => {
        img.style.display = 'none';
      });
    });

    img.addEventListener('error', function () {
      reject(new Error('Image is not loaded'));
    });
  });
};

let currentImg;

createImage(img1)
  .then(img => {
    currentImg = img;
    console.log('Image 1 is loaded');
    return wait(2);
  })
  .then(() => {
    currentImg.style.display = 'none';
    return createImage(img2);
  })
  .then(img => {
    currentImg = img;
    console.log('Image 2 is loaded');
    return wait(2);
  })
  .then(() => {
    currentImg.style.display = 'none';
  })
  .catch(err => {
    console.error(err);
  });

///////////////////////////////////////
///////////////////////////////////////
// ASYNC AWAIT CONSUMING PROMISES

const getPosition = function () {
  return new Promise(function (resolve, reject) {
    navigator.geolocation.getCurrentPosition(resolve, reject);
  });
};

// inside an async function we can have one or more await statements
const whereAmI = async function (country) {
  try {
    // Geolocation
    const pos = await getPosition();
    const { latitude: lat, longitude: lng } = pos.coords;
    // Reverse GeoCoding
    const resGeo = await fetch(`https://geocode.xyz/${lat},${lng}?geoit=json`);

    if (!resGeo.ok) throw Error(`Problem getting location data ⛔`);

    const dataGeo = await resGeo.json();

    // Fetching the Countries Data
    const res = await fetch(`https://restcountries.eu/rest/v2/name/${country}`);

    if (!res) throw new Error('Problem getting country ⛔');

    const [data] = await res.json();
    renderCountry(data);

    return `You are in ${dataGeo.city}, ${dataGeo.country}`;

    // Catching errors
  } catch (err) {
    renderError(`💥 ${err.message}`);

    // Reject promise returned from async function
    throw err;
  }
};

console.log('1: will be getting location');
// whereAmI('portugal')
//   .then(city => console.log(`2: ${city}`))
//   .catch(err => console.error(`2: ${err.message}`))
//   .finally(() => console.log('3: finished getting location'));

(async function () {
  try {
    const city = await whereAmI('portugal');
    console.log(`2: ${city}`);
  } catch (err) {
    console.error(`2: ${err.message}`);
  }

  console.log('3: finished getting location');
})();

///////////////////////////////////////
///////////////////////////////////////
// RUNNING PROMISES IN PARALLEL

// Get JSON function
const getJSON = function (url, errorMsg = 'something went wrong') {
  return fetch(url).then(response => {
    if (!response.ok) throw new Error(`${errorMsg} (${response.status})`);
    
    return response.json();
  });
};

// Get three countries function
const get3Countries = async function (c1, c2, c3) {
  try {
    // this function will take an ARRAY of promises and it will return the the new promise which we can handle
    // when one promise reject the whole Promise.all() will reject, in short it will short circuit
    
    const data = await Promise.all([
      getJSON(`https://restcountries.eu/rest/v2/name/${c1}`),
      getJSON(`https://restcountries.eu/rest/v2/name/${c2}`),
      getJSON(`https://restcountries.eu/rest/v2/name/${c3}`),
    ]);
    
    const capitals = data.map(cap => cap[0].capital);
    console.log(capitals);
  } catch (err) {
    console.error(err);
  }
};

get3Countries('portugal', 'usa', 'pakistan');

///////////////////////////////////////
///////////////////////////////////////
// OTHER PROMISE COMBINATORS
// Promise.race
// just like other combinators, recieve arrays of Promises and returns an Promise
// first settled (loaded/ wins) Promise wins the race

(async function () {
  const res = await Promise.race([
    getJSON(`https://restcountries.eu/rest/v2/name/egypt`),
    getJSON(`https://restcountries.eu/rest/v2/name/italy`),
    getJSON(`https://restcountries.eu/rest/v2/name/mexico`),
  ]);

  console.log(res[0]);
})();

const timeout = async function (seconds) {
  return new Promise(function (_, reject) {
    setTimeout(() => {
      reject(new Error('Request took too long'));
    }, seconds * 1000);
  });
};

Promise.race([
  getJSON(`https://restcountries.eu/rest/v2/name/tanzania`),
  timeout(1),
])
  .then(data => console.log(data[0]))
  .catch(err => console.error(err));

// Promise.allSettled
Promise.allSettled([
  Promise.resolve('Success'),
  Promise.reject('ERROR'),
  Promise.resolve('Another Success'),
]).then(res => console.log(res));

Promise.all([
  Promise.resolve('Success'),
  Promise.reject('ERROR'),
  Promise.resolve('Another Success'),
])
  .then(res => console.log(res))
  .catch(err => console.error(err));

// Promise.any
Promise.any([
  Promise.resolve('Success'),
  Promise.reject('ERROR'),
  Promise.resolve('Another Success'),
])
  .then(res => console.log(res))
  .catch(err => console.error(err));

///////////////////////////////////////
///////////////////////////////////////
// CODING CHALLENGE #3
const wait = function (seconds) {
  return new Promise(function (resolve) {
    setTimeout(resolve, seconds * 1000);
  });
};

const imgContainer = document.querySelector('.images');

const createImage = function (imgPath) {
  return new Promise(function (resolve, reject) {
    const img = document.createElement('img');
    img.src = imgPath;

    img.addEventListener('load', function () {
      imgContainer.append(img);
      resolve(img);
    });

    img.addEventListener('error', function () {
      reject(new Error('Image not found'));
    });
  });
};
*/

// Part: 1
/*
const loadNPause = async function () {
  try {
    // img 1
    const img1 = await createImage('img/img-1.jpg');
    console.log(img1);
    await wait(2);
    img1.style.display = 'none';

    // wating for the second load image
    await wait(2);

    // img 2
    const img2 = await createImage('img/img-2.jpg');
    console.log(img2);
    await wait(2);
    img2.style.display = 'none';
  } catch (err) {
    console.log(err);
  }
};
loadNPause();

// Part: 2
const loadAll = async function (imgArr) {
  const imgs = imgArr.map(async img => await createImage(img));
  const imgEl = await Promise.all(imgs);
  imgEl.forEach(img => img.classList.add('parallel'));
};

loadAll(['img/img-1.jpg', 'img/img-2.jpg', 'img/img-3.jpg']);
*/
