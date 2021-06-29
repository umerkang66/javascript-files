'use strict';

const btn = document.querySelector('.btn-country');
const countriesContainer = document.querySelector('.countries');

///////////////////////////////////////
///////////////////////////////////////
// https://restcountries.eu/rest/v2/name/{name}

/*
const renderCountry = (data, neighbour = false) => {
  const markup = `
    <article class="country ${neighbour ? 'neighbour' : ''}">
      <img class="country__img" src="${data.flag}" />
      <div class="country__data">
        <h3 class="country__name">${data.name}</h3>
        <h4 class="country__region">${data.region}</h4>
        <p class="country__row">
          <span>👫</span>${(+data.population / 1000000).toFixed(1)}M people
        </p>
        <p class="country__row">
          <span>🗣️</span>${data.languages[0].name}
        </p>
        <p class="country__row">
          <span>💰</span>${data.currencies[0].name}
        </p>
      </div>
    </article>
  `;

  countriesContainer.insertAdjacentHTML('beforeend', markup);
  countriesContainer.style.opacity = 1;
};

const getCountryAndNeighbour = function (countryName) {
  const request = new XMLHttpRequest();
  request.open('GET', `https://restcountries.eu/rest/v2/name/${countryName}`);
  request.send();

  request.addEventListener('load', function () {
    const [data] = JSON.parse(this.responseText);
    const [neighbour] = data.borders;
    if (!neighbour) return;

    console.log(data);

    const request2 = new XMLHttpRequest();
    request2.open('GET', `https://restcountries.eu/rest/v2/name/${neighbour}`);
    request2.send();

    request2.addEventListener('load', function () {
      const [dataNeighbour] = JSON.parse(this.responseText);
      renderCountry(data);
      renderCountry(dataNeighbour, true);
    });
  });
};

getCountryAndNeighbour('pakistan');

fetch('https://restcountries.eu/rest/v2/name/pakistan')
.then(res => res.json())
.then(([data]) => console.log(data.name));

const renderCountry = (data, neighbour = false) => {
  const markup = `
    <article class="country ${neighbour ? 'neighbour' : ''}">
      <img class="country__img" src="${data.flag}" />
      <div class="country__data">
        <h3 class="country__name">${data.name}</h3>
        <h4 class="country__region">${data.region}</h4>
        <p class="country__row">
          <span>👫</span>${(+data.population / 1000000).toFixed(1)}M people
        </p>
        <p class="country__row">
          <span>🗣️</span>${data.languages[0].name}
        </p>
        <p class="country__row">
          <span>💰</span>${data.currencies[0].name}
        </p>
      </div>
    </article>
  `;

  countriesContainer.insertAdjacentHTML('beforeend', markup);
};

const renderError = function (message) {
  countriesContainer.insertAdjacentText('beforeend', message);
};

const getJson = function (url, countryType = '') {
  return fetch(url).then(res => {
    if (!res.ok)
      throw new Error(`${countryType} Country is not found ${res.status}`);

    return res.json();
  });
};

const getCountryData = function (country) {
  getJson(`https://restcountries.eu/rest/v2/name/${country}`, 'Main')
    .then(([data]) => {
      renderCountry(data);
      const neighbour = data.borders[0];
      if (!neighbour)
        throw new Error('This country does not has any neighbours');

      return getJson(
        `https://restcountries.eu/rest/v2/name/${neighbour}`,
        'Neighbour'
      );
    })
    .then(([data]) => renderCountry(data, true))
    .catch(err => {
      renderError(`${err.message} 🎇🎇🎇`);
      console.error(`${err.message} 🎇🎇🎇`);
    })
    .finally(() => {
      countriesContainer.style.opacity = 1;
    });
};

getCountryData('ireland');

// `https://geocode.xyz/${latitude},${longitude}?geoit=json`;

const renderCountry = (data, neighbour = false) => {
  const markup = `
    <article class="country ${neighbour ? 'neighbour' : ''}">
      <img class="country__img" src="${data.flag}" />
      <div class="country__data">
        <h3 class="country__name">${data.name}</h3>
        <h4 class="country__region">${data.region}</h4>
        <p class="country__row">
          <span>👫</span>${(+data.population / 1000000).toFixed(1)}M people
        </p>
        <p class="country__row">
          <span>🗣️</span>${data.languages[0].name}
        </p>
        <p class="country__row">
          <span>💰</span>${data.currencies[0].name}
        </p>
      </div>
    </article>
  `;

  countriesContainer.insertAdjacentHTML('beforeend', markup);
};

const renderError = function (message) {
  countriesContainer.insertAdjacentText('beforeend', message);
};

const getLocation = (latitude, longitude) => {
  fetch(`https://geocode.xyz/${latitude},${longitude}?geoit=json`)
    .then(res => {
      if (!res.ok)
        throw new Error(
          'Your Location does not found. Try again latter 😃😃😃'
        );

      return res.json();
    })
    .then(data => {
      console.log(data.city);
      renderCountry(data.city);
    })
    .catch(err => renderError(err.message));
};

getLocation(52.508, 12.381);

console.log('test start');
setTimeout(() => console.log('0 seconds passed'), 0);
Promise.resolve('Resolved Promise 1').then(res => console.log(res));
Promise.resolve('Resolved Promise 2').then(res => {
  for (let i = 0; i < 1000000000; i++) {}
  console.log(res);
});
console.log('test end');

const lotteryPromise = new Promise((resolve, reject) => {
  console.log('Lottery draw is happening');

  setTimeout(() => {
    if (Math.random() >= 0.5) resolve('You win 🏆🏆🏆');
    else reject(new Error('You lose your money 💩💩💩'));
  }, 2000);
});

lotteryPromise.then(res => console.log(res)).catch(err => console.error(err));

// Promisifying the setTimeOut
const wait = sec => new Promise(resolve => setTimeout(resolve, sec * 1000));

wait(2)
  .then(() => {
    console.log('2 seconds passed');
    return wait(1);
  })
  .then(() => {
    console.log('1 more second is passed');
    return wait(0);
  })
  .then(() => {
    console.log('I will happen immediately');
  });

  
const getPosition = () =>
new Promise((resolve, reject) => {
  navigator.geolocation.getCurrentPosition(resolve, reject);
});
  
getPosition().then(({ coords }) => console.lo(coords));


Your tasks:
Tasks are not super-descriptive this time, so that you can figure out some stuff by
yourself. Pretend you're working on your own �
PART 1

1. Create a function 'createImage' which receives 'imgPath' as an input.
This function returns a promise which creates a new image (use
document.createElement('img')) and sets the .src attribute to the
provided image path

2. When the image is done loading, append it to the DOM element with the
'images' class, and resolve the promise. The fulfilled value should be the
image element itself. In case there is an error loading the image (listen for
the'error' event), reject the promise

3. If this part is too tricky for you, just watch the first part of the solution

PART 2
4. Consume the promise using .then and also add an error handler

5. After the image has loaded, pause execution for 2 seconds using the 'wait'
function we created earlier

6. After the 2 seconds have passed, hide the current image (set display CSS
property to 'none'), and load a second image (Hint: Use the image element
returned by the 'createImage' promise to hide the current image. You will
need a global variable for that �)

7. After the second image has loaded, pause execution for 2 seconds again

8. After the 2 seconds have passed, hide the current image

Test data: Images in the img folder. Test the error handler by passing a wrong
image path. Set the network speed to “Fast 3G” in the dev tools Network tab,
otherwise images load too fast
GOOD LUCK 😀😀😀

const renderCountry = (data, neighbour = false) => {
  const markup = `
    <article class="country ${neighbour ? 'neighbour' : ''}">
      <img class="country__img" src="${data.flag}" />
      <div class="country__data">
        <h3 class="country__name">${data.name}</h3>
        <h4 class="country__region">${data.region}</h4>
        <p class="country__row">
          <span>👫</span>${(+data.population / 1000000).toFixed(1)}M people
        </p>
        <p class="country__row">
          <span>🗣️</span>${data.languages[0].name}
        </p>
        <p class="country__row">
          <span>💰</span>${data.currencies[0].name}
        </p>
      </div>
    </article>
  `;

  countriesContainer.insertAdjacentHTML('beforeend', markup);
  countriesContainer.style.opacity = 1;
};

const renderError = function (message) {
  countriesContainer.insertAdjacentText('beforeend', `🚫🚫🚫${message}`);
  countriesContainer.style.opacity = 1;
};

const getPosition = function () {
  return new Promise((resolve, reject) => {
    navigator.geolocation.getCurrentPosition(resolve, reject);
  });
};

const whereAmI = async function () {
  try {
    const { coords } = await getPosition();
    const { latitude, longitude } = coords;

    // My Country Data
    const countryRes = await fetch(
      `https://geocode.xyz/${latitude},${longitude}?geoit=json`
    );

    if (!countryRes.ok)
      throw new Error(`Country(GeoCode) not Found ${countryRes.status}`);

    const { prov: country } = await countryRes.json();

    // Any Country Data
    const res = await fetch(`https://restcountries.eu/rest/v2/name/${country}`);

    if (!res.ok) throw new Error(`Country not Found ${res.status}`);

    const [data] = await res.json();
    renderCountry(data);

    const neighbourRes = await fetch(
      `https://restcountries.eu/rest/v2/alpha/${data.borders[0]}`
    );

    if (!neighbourRes.ok)
      throw new Error(`Neighbour Country not Found ${neighbourRes.status}`);

    const neighbourData = await neighbourRes.json();
    renderCountry(neighbourData, true);

    return '2: YOU ARE IN PAKISTAN';
  } catch (err) {
    renderError(err.message);
    throw err;
  }
};

(async () => {
  try {
    console.log('1: WILL BE GETTING LOCATION');
    const city = await whereAmI();
    console.log(city);

    console.log('2: FINISHED GETTING LOCATION');
  } catch (err) {
    console.error(err);
  }
})();

const renderCountry = (data, neighbour = false) => {
  const markup = `
    <article class="country ${neighbour ? 'neighbour' : ''}">
      <img class="country__img" src="${data.flag}" />
      <div class="country__data">
        <h3 class="country__name">${data.name}</h3>
        <h4 class="country__region">${data.region}</h4>
        <p class="country__row">
          <span>👫</span>${(+data.population / 1000000).toFixed(1)}M people
        </p>
        <p class="country__row">
          <span>🗣️</span>${data.languages[0].name}
        </p>
        <p class="country__row">
          <span>💰</span>${data.currencies[0].name}
        </p>
      </div>
    </article>
  `;

  countriesContainer.insertAdjacentHTML('beforeend', markup);
  countriesContainer.style.opacity = 1;
};



const get3Countries = async function (country1, country2, country3) {
  try {
    const country1Json = getJson(getCountryUrl(country1), 'First');
    const country2Json = getJson(getCountryUrl(country2), 'Second');
    const country3Json = getJson(getCountryUrl(country3), 'Third');
    
    // prettier-ignore
    const [country] = await Promise.race([country1Json, country2Json, country3Json]);
    
    renderCountry(country);
  } catch (err) {
    console.error(err);
  }
};

get3Countries('egypt', 'mexico', 'italy');

const getJson = async function (url, countryType = '') {
  try {
    const res = await fetch(url);
    if (!res.ok)
      throw new Error(`${countryType} Country is not found ${res.status}`);

    return res.json();
  } catch (err) {
    throw err;
  }
};

const getCountryUrl = cntry => `https://restcountries.eu/rest/v2/name/${cntry}`;

const timeout = sec => {
  return new Promise((_, reject) => {
    setTimeout(() => {
      reject(new Error('Request took too long'));
    }, sec * 1000);
  });
};

Promise.race([getJson(getCountryUrl('portugal')), timeout(59)])
  .then(res => console.log(res))
  .catch(err => console.error(err));

const country1Json = getJson(getCountryUrl('pakistan'), 'First');
const country2Json = getJson(getCountryUrl('tanzania'), 'Second');
const country3Json = getJson(getCountryUrl('usa'), 'Third');

// prettier-ignore
Promise.all([country1Json, country2Json, country3Json]).then(res => console.log(res)).catch(err => console.error(err));
*/
