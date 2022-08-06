'use strict';

/////////////////////////////////////////////////
/////////////////////////////////////////////////
// BANKIST APP

/////////////////////////////////////////////////
// Data

// DIFFERENT DATA! Contains movement dates, currency and locale

const account1 = {
  owner: 'Jonas Schmedtmann',
  movements: [200, 455.23, -306.5, 25000, -642.21, -133.9, 79.97, 1300],
  interestRate: 1.2, // %
  pin: 1111,

  movementsDates: [
    '2019-11-18T21:31:17.178Z',
    '2019-12-23T07:42:02.383Z',
    '2020-01-28T09:15:04.904Z',
    '2020-04-01T10:17:24.185Z',
    '2020-05-08T14:11:59.604Z',
    '2020-01-23T17:01:17.194Z',
    '2020-01-24T23:36:17.929Z',
    '2020-01-25T10:51:36.790Z',
  ],
  currency: 'EUR',
  locale: 'pt-PT', // de-DE
};

const account2 = {
  owner: 'Jessica Davis',
  movements: [5000, 3400, -150, -790, -3210, -1000, 8500, -30],
  interestRate: 1.5,
  pin: 2222,

  movementsDates: [
    '2019-11-01T13:15:33.035Z',
    '2019-11-30T09:48:16.867Z',
    '2019-12-25T06:04:23.907Z',
    '2020-01-25T14:18:46.235Z',
    '2020-02-05T16:33:06.386Z',
    '2020-04-10T14:43:26.374Z',
    '2020-06-25T18:49:59.371Z',
    '2020-07-26T12:01:20.894Z',
  ],
  currency: 'USD',
  locale: 'en-US',
};

const accounts = [account1, account2];

/////////////////////////////////////////////////
// Elements
const labelWelcome = document.querySelector('.welcome');
const labelDate = document.querySelector('.date');
const labelBalance = document.querySelector('.balance__value');
const labelSumIn = document.querySelector('.summary__value--in');
const labelSumOut = document.querySelector('.summary__value--out');
const labelSumInterest = document.querySelector('.summary__value--interest');
const labelTimer = document.querySelector('.timer');

const containerApp = document.querySelector('.app');
const containerMovements = document.querySelector('.movements');

const btnLogin = document.querySelector('.login__btn');
const btnTransfer = document.querySelector('.form__btn--transfer');
const btnLoan = document.querySelector('.form__btn--loan');
const btnClose = document.querySelector('.form__btn--close');
const btnSort = document.querySelector('.btn--sort');

const inputLoginUsername = document.querySelector('.login__input--user');
const inputLoginPin = document.querySelector('.login__input--pin');
const inputTransferTo = document.querySelector('.form__input--to');
const inputTransferAmount = document.querySelector('.form__input--amount');
const inputLoanAmount = document.querySelector('.form__input--loan-amount');
const inputCloseUsername = document.querySelector('.form__input--user');
const inputClosePin = document.querySelector('.form__input--pin');

/////////////////////////////////////////////////
// Functions

const formatCur = function (value, locale, currency) {
  return Intl.NumberFormat(locale, {
    style: 'currency',
    currency: currency,
  }).format(value);
};

const formatMovementDate = function (date, locale) {
  const calcDaysPassed = (date1, date2) =>
    Math.round(Math.abs((date2 - date1) / (1000 * 60 * 60 * 24)));

  const daysPassed = calcDaysPassed(new Date(), date);
  // console.log(daysPassed);

  if (daysPassed === 0) return 'Today';
  if (daysPassed === 1) return 'Yesterday';
  if (daysPassed <= 7) return `${daysPassed} days ago`;

  // const day = `${date.getDate()}`.padStart(2, '0');
  // const month = `${date.getMonth() + 1}`.padStart(2, '0');
  // const year = `${date.getFullYear()}`;

  // return `${day}/${month}/${year}`;
  return new Intl.DateTimeFormat(locale).format(date);
};

const displayMovements = function (acc, sort = false) {
  containerMovements.innerHTML = '';

  const movs = sort
    ? acc.movements.slice().sort((a, b) => a - b)
    : acc.movements;

  movs.forEach(function (mov, i) {
    const type = mov > 0 ? 'deposit' : 'withdrawal';

    // DATE
    const date = new Date(acc.movementsDates[i]);
    const displayDate = formatMovementDate(date, acc.locale);

    const options = {
      style: 'currency',
      currency: acc.currency,
    };
    const formatedMov = formatCur(mov, acc.locale, acc.currency);

    // Intl.NumberFormat(acc.locale, options).format(mov);

    const html = `(
      <div class="movements__row">
        <div class="movements__type movements__type--${type}">
          ${i + 1} ${type}
        </div>
        <div class="movements__date">${displayDate}</div>
        <div class="movements__value">${formatedMov}</div>
      </div>
    )`;

    containerMovements.insertAdjacentHTML('afterbegin', html);
  });
};

const calcDisplayBalance = function (acc) {
  acc.balance = acc.movements.reduce((acc, mov) => acc + mov, 0);

  labelBalance.textContent = formatCur(acc.balance, acc.locale, acc.currency);
};

const calcDisplaySummary = function (acc) {
  const incomes = acc.movements
    .filter(mov => mov > 0)
    .reduce((acc, mov) => acc + mov, 0);
  labelSumIn.textContent = formatCur(incomes, acc.locale, acc.currency);

  const out = acc.movements
    .filter(mov => mov < 0)
    .reduce((acc, mov) => acc + mov, 0);
  labelSumOut.textContent = formatCur(Math.abs(out), acc.locale, acc.currency);

  const interest = acc.movements
    .filter(mov => mov > 0)
    .map(deposit => (deposit * acc.interestRate) / 100)
    .filter((int, i, arr) => {
      // console.log(arr);
      return int >= 1;
    })
    .reduce((acc, int) => acc + int, 0);
  labelSumInterest.textContent = formatCur(interest, acc.locale, acc.currency);
};

const createUsernames = function (accs) {
  accs.forEach(function (acc) {
    acc.username = acc.owner
      .toLowerCase()
      .split(' ')
      .map(name => name[0])
      .join('');
  });
};
createUsernames(accounts);

const updateUI = function (acc) {
  // Display movements
  displayMovements(acc);

  // Display balance
  calcDisplayBalance(acc);

  // Display summary
  calcDisplaySummary(acc);
};

const logOutTimer = function () {
  const tick = function () {
    // In each call print the remaining time to the UI
    const min = String(Math.trunc(time / 60)).padStart(2, 0);
    const sec = String(time % 60).padStart(2, 0);

    labelTimer.textContent = `${min}: ${sec}`;

    // When we reach 0 seconds, stop timer and log Out the User
    if (time === 0) {
      clearInterval(timer);

      labelWelcome.textContent = 'Log in to get started';
      containerApp.style.opacity = 0;
    }

    // Decrease 1 second
    time--;
  };

  // Set time to five minutes
  let time = 30;
  // Call the timer every second
  tick();
  const timer = setInterval(tick, 1000);
  return timer;
};

///////////////////////////////////////
// Event handlers
let currentAccount, timer;

// FAKE ALWAYS LOG IN
// currentAccount = account1;
// updateUI(currentAccount);
// containerApp.style.opacity = 1;

btnLogin.addEventListener('click', function (e) {
  // Prevent form from submitting
  e.preventDefault();

  currentAccount = accounts.find(
    acc => acc.username === inputLoginUsername.value
  );
  console.log(currentAccount);

  if (currentAccount?.pin === +inputLoginPin.value) {
    // Display UI and message
    labelWelcome.textContent = `Welcome back, ${
      currentAccount.owner.split(' ')[0]
    }`;
    containerApp.style.opacity = 100;

    // DISPLAYING CURRECT BALANCE'S DATE
    const now = new Date();
    const options = {
      hour: 'numeric',
      minute: 'numeric',
      day: 'numeric',
      month: 'numeric',
      year: 'numeric',
      // weekday: 'long',
    };

    // const locale = navigator.language;
    // console.log(locale);

    labelDate.textContent = new Intl.DateTimeFormat(
      currentAccount.locale,
      options
    ).format(now);
    // const day = `${now.getDate()}`.padStart(2, '0');
    // const month = `${now.getMonth() + 1}`.padStart(2, '0');
    // const year = `${now.getFullYear()}`;
    // const hour = `${now.getHours()}`.padStart(2, '0');
    // const min = `${now.getMinutes()}`.padStart(2, '0');
    // const sec = `${now.getSeconds()}`.padStart(2, '0');

    // labelDate.textContent = `${day}/${month}/${year}, ${hour}: ${min}: ${sec}`;

    // Clear input fields
    inputLoginUsername.value = inputLoginPin.value = '';
    inputLoginPin.blur();

    // Activating the timer
    if (timer) clearInterval(timer);
    timer = logOutTimer();

    // Update UI
    updateUI(currentAccount);
  }
});

btnTransfer.addEventListener('click', function (e) {
  e.preventDefault();
  const amount = +inputTransferAmount.value;
  const receiverAcc = accounts.find(
    acc => acc.username === inputTransferTo.value
  );
  inputTransferAmount.value = inputTransferTo.value = '';

  if (
    amount > 0 &&
    receiverAcc &&
    currentAccount.balance >= amount &&
    receiverAcc?.username !== currentAccount.username
  ) {
    // Doing the transfer
    currentAccount.movements.push(-amount);
    receiverAcc.movements.push(amount);

    // Adding the new date to the CURRENT OBJECT
    currentAccount.movementsDates.push(new Date().toISOString());
    receiverAcc.movementsDates.push(new Date().toISOString());

    // Update UI
    updateUI(currentAccount);

    // Reset the timer
    clearInterval(timer);
    timer = logOutTimer();
  }
});

btnLoan.addEventListener('click', function (e) {
  e.preventDefault();

  const amount = Math.floor(inputLoanAmount.value);

  if (amount > 0 && currentAccount.movements.some(mov => mov >= amount * 0.1)) {
    setTimeout(() => {
      // Add movement
      currentAccount.movements.push(amount);

      // Adding the new date to the CURRENT OBJECT
      currentAccount.movementsDates.push(new Date().toISOString());

      // Update UI
      updateUI(currentAccount);
    }, 2000);

    // Reset the timer
    clearInterval(timer);
    timer = logOutTimer();
  }
  inputLoanAmount.value = '';
});

btnClose.addEventListener('click', function (e) {
  e.preventDefault();

  if (
    inputCloseUsername.value === currentAccount.username &&
    +inputClosePin.value === currentAccount.pin
  ) {
    const index = accounts.findIndex(
      acc => acc.username === currentAccount.username
    );
    console.log(index);
    // .indexOf(23)

    // Delete account
    accounts.splice(index, 1);

    // Hide UI
    containerApp.style.opacity = 0;
  }

  inputCloseUsername.value = inputClosePin.value = '';
});

let sorted = false;
btnSort.addEventListener('click', function (e) {
  e.preventDefault();
  displayMovements(currentAccount.movements, !sorted);
  sorted = !sorted;
});

labelBalance.addEventListener('click', function () {
  [...document.querySelectorAll('.movements__row')].forEach(function (row, i) {
    // 0 2 4 6
    if (i % 2 === 0) row.style.backgroundColor = '#F5EBC6';
  });
});

/////////////////////////////////////////////////
/////////////////////////////////////////////////
// LECTURES


console.log(23 === 23.0);
console.log(0.1 + 0.2);
console.log(0.1 + 0.2 === 0.3);

// Converted strings to numbers
console.log(Number('23'));
console.log(+'23');

// every function is also an object and have methods on it
// parseInt function also accept second argument which is so-called REGEX
console.log(Number.parseInt('43px', 10));
console.log(Number.parseInt('439rem', 10));

console.log(Number.parseFloat('23.4343px'));
console.log(parseFloat('23.4343px'));
console.log(parseFloat('234343px'));
// traditional old school way of doing it

// these functions are also GLOBAL FUNCTIONS so we would not have to pass them on to the NUMBER OBJECT
// Check if value is not a Number
console.log(Number.isNaN(+'20'));
console.log(Number.isNaN(23 / 0));

// Checking if the value is a number THE BEST WAY
console.log(Number.isFinite(20));
console.log(Number.isFinite(+'20'));
console.log(Number.isFinite(+'20X'));
// Check if the value is integer
console.log(Number.isInteger(23));
console.log(Number.isInteger(23.0));
console.log(Number.isInteger(23.004));

/////////////////////////////////////////////////////////
/////////////////////////////////////////////////////////
// MATH AND ROUNDING

console.log(Math.sqrt(64));
console.log(25 ** (1 / 2));
console.log(8 ** (1 / 3));

console.log(Math.max(23, 43, 1, 54));
console.log(Math.max(23, 43, 1, '54px'));
console.log(Math.min(23, 43, 1, 54));

// Both does Type Coersion
console.log(Math.PI * Number.parseFloat('10px') ** 2);
// Area of a circle PI * radius Square

console.log(Math.trunc(Math.random() * 23) + 1);

const randomInt = (min, max) =>
Math.floor(Math.random() * (max - min) + 1) + min;

// console.log(randomInt(10, 23));

// Rounding integers
console.log(Math.trunc(23.8));
console.log(Math.round(23.8));

// Rounds down to always to highest number
console.log(Math.ceil(23.3));
console.log(Math.ceil(23.8));

console.log(Math.floor(23.8));
console.log(Math.floor(23.8));
// all of these methods do type coersion

console.log(Math.trunc(-23.3));
console.log(Math.floor(-23.3));

// rounding decimals

// to fixed always return the string
console.log((2.7).toFixed(0));
console.log(+(2.7777).toFixed(3));

console.log(5 % 2);
console.log(8 % 3);

console.log(9 % 2);

console.log(7 % 2);

const isEven = n => (n % 2 === 0 ? 'It is even' : 'It is odd');

console.log(isEven(45));
console.log(isEven(2));



// for Nth time it is a good idea to use the remainder operator for that

console.log(2 ** 53 - 1);
console.log(Number.MAX_SAFE_INTEGER);
console.log(2 ** 53 + 5);

console.log(473874387438473748374375635652963n);
console.log(BigInt(473874387438473748374375635652963));

// Operations
console.log(10000n + 10000n);

const huge = 234343874387438473874n;
const num = 23;

console.log(huge * BigInt(num));

// EXCEPTIONS: Logical operators
console.log(25n > 15);
console.log(25n === 25);
// as we use the tripple opeartor it does not do the TYPE COERSOIN

console.log(typeof 23n);
console.log(25n == 25);
// double equality opeartor does TYPE COERSION

// 2: String concatenation
console.log(huge + ' IS REALLY BIG');
console.log(Math.sqrt(huge));

// Divisions
console.log(10n / 3n); // it will cut off the decimal part


///////////////////////////////////////////////////////
///////////////////////////////////////////////////////
// DATES
// const now = new Date();
// console.log(now);

// console.log(new Date('Jan 28 2021 14:55:54'));
// console.log(new Date('December 23, 2015'));
// console.log(new Date(account1.movementsDates[0]));

// console.log(new Date(2037, 10, 19, 15, 23, 5));
// console.log(new Date(2037, 10, 31));

// // Months in javaScript are zero based

// console.log(new Date(0));
// console.log(new Date(3 * 24 * 60 * 60 * 1000));


// Working with dates
const future = new Date(2037, 10, 19, 15, 23);
console.log(future.getFullYear());
console.log(future.getMonth());
console.log(future.getDate());
console.log(future.getDay()); // it is the day of the week
console.log(future.getHours());
console.log(future.getMinutes());
console.log(future.getSeconds());
console.log(future.toISOString());
console.log(future.getTime()); // these are the milliseconds from from jan 1 1970

console.log(new Date(2142238980000));
console.log(Date.now());

future.setFullYear(2040);
console.log(future);
// const future = new Date(2037, 10, 19, 15, 23);

// console.log(future.toISOString());

//////////////////////////////////////////////////////
//////////////////////////////////////////////////////
// DATE OPERATORS
const future = new Date(2037, 10, 19, 15, 23);
const present = new Date(2020, 0, 25, 21, 23);

// A generic function that will return the days passed between the two dates
const calcDaysPassed = (date1, date2) =>
Math.abs((date2 - date1) / (1000 * 60 * 60 * 24));

const day1 = calcDaysPassed(new Date(2037, 3, 14), new Date(2037, 3, 4, 10, 8));

console.log(day1);

const options = {
  style: 'currency',
  currency: 'EUR',
  // useGrouping: false,
};

const num = 2378534.734;
console.log(
  'US:          ',
  new Intl.NumberFormat('en-US', options).format(num)
);
console.log(
  'Germay:      ',
  new Intl.NumberFormat('de-DE', options).format(num)
);
console.log(
  'Syria:       ',
  new Intl.NumberFormat('ar-SY', options).format(num)
);
console.log(
  navigator.language,
  '       ',
  new Intl.NumberFormat(navigator.language, options).format(num)
);

////////////////////////////////////////////////////////
////////////////////////////////////////////////////////
// SETTIMEOUT AND SET INTERVAL

const ingredients = ['olives', 'spinach'];
// setTimeOut function
const pizzaTimer = setTimeout(
  (sweet, salad) => {
    console.log(`Here is your pizza with ${sweet} and ${salad}`);
  },
  3 * 1000,
  ...ingredients
  );
  
  console.log('...waiting');
  
  if (ingredients.includes('spinach')) clearTimeout(pizzaTimer);
  
  // setInterval function
  
  // setInterval(() => {
    //   const now = new Date();
    //   const hours = now.getHours();
    //   const minutes = now.getMinutes();
    //   const seconds = now.getSeconds();
    
    //   console.log(`${hours}:${minutes}:${seconds}`);
    
    // }, 1000);
    
*/
