'use strict';

/*
const bookings = [];

const createBooking = function (
  flightNum,
  numPassengers = 1,
  price = 199 * numPassengers
) {
  // ES5 way of doing it
  //   numPassengers = numPassengers || 1;
  //   price = price || 199;

  const booking = {
    flightNum,
    numPassengers,
    price,
  };

  console.log(booking);
  bookings.push(booking);
};

createBooking('LH123');
createBooking('LH123', 2, 800);

createBooking('LH123', undefined, 9000);

const flight = 'LH234';
const jonas = {
  name: 'Jonas Schmedtmann',
  passport: 234347874834,
};

const checkIn = function (flightNum, passenger) {
  flightNum = 'LH999';
  passenger.name = 'Mr. ' + passenger.name;

  if (passenger.passport === 234347874834) {
    alert('Check in');
  } else {
    alert('Wrong passport');
  }
};

// checkIn(flight, jonas);
// console.log(flight);
// console.log(jonas);

// Is same as doing
// const flightNum = flight; // primitives are just like this
// const passenger = jonas;  // objects and arrays (reference types are just like this)

const newPassport = function (person) {
  person.passport = Math.trunc(Math.random() * 1000000000);
};

newPassport(jonas);
checkIn(flight, jonas);


const oneWord = function (str) {
  return str.replaceAll(' ', '').toLowerCase();
};

const upperFirstWord = function (str) {
  const [first, ...others] = str.split(' ');
  return [first.toUpperCase(), ...others].join(' ');
};

// Higher-order functions
const transformer = function (str, fn) {
  console.log(`Orignial string: ${str}`);
  console.log(`Transformed string: ${fn(str)}`);

  console.log(`Transformed by: ${fn.name}`);
  console.log('-----------------------');
};

transformer('JavaScript is the best language', upperFirstWord);
transformer('JavaScript is the best language', oneWord);

// JS uses callbacks all the time
const high5 = function () {
  console.log('👋');
};
document.body.addEventListener('click', high5);

['jonas', 'martha', 'adam'].forEach(high5);

const greet = function (greeting) {
  return function (name) {
    console.log(`${greeting} ${name}`);
  };
};

const greeterHey = greet('Hey!');
greeterHey('Jonas');
greeterHey('Umer');

greet('Hello!')('Jonas');

// Recreating the whole function with arrow functions
const greetArrow = greeting => name => console.log(`${greeting} ${name}`);
const greetHello = greet('Hello!');
greetHello('Umer kang.');

const lufthansa = {
  airline: 'Lufthansa',
  iataCode: 'LH',
  booking: [],

  // book: function () {},

  book(flightNum, name) {
    console.log(
      `${name} has booked a seat on ${this.airline} flight: ${this.iataCode} ${flightNum}`
    );

    this.booking.push({ flight: `${this.iataCode} ${flightNum}`, name });
  },
};

lufthansa.book(239, 'Umer Kang');
lufthansa.book(635, 'Jonas Schmedtmann');
console.log(lufthansa);

const book = lufthansa.book;

const eurowings = {
  airline: 'Eurowings',
  iataCode: 'EW',
  booking: [],
};

// Does NOT work
// book(23, 'Sarah Williams');

// CALL METHOD
book.call(eurowings, 23, 'Sarah Williams');
console.log(eurowings);

book.call(lufthansa, 13, 'Umer Kang');
console.log(lufthansa);

const swiss = {
  airline: 'Swiss',
  iataCode: 'LX',
  booking: [],
};

book.call(swiss, 75, 'Gulzar Kang');

// APPLY METHOD
const flightData = [583, 'George Cooper'];
book.apply(swiss, flightData);
console.log(swiss);

book.call(swiss, ...flightData);

// BING METHOD
const bookEW = book.bind(eurowings);
const bookLH = book.bind(lufthansa);
const bookLX = book.bind(swiss);

bookEW(743, 'Steven Williams');

const bookEW53 = book.bind(eurowings, 53);
bookEW53('Jonas Schmedtmann');
bookEW53('Martha Kharnwald');
bookEW53('Tyrion Lannister');

// With Event Listners
lufthansa.plane = 300;
lufthansa.buyPlane = function () {
  console.log(this);

  this.plane++;
  console.log(this.plane);
};

const lufthansaFuntionBind = lufthansa.buyPlane.bind(lufthansa);

document
  .querySelector('.buy')
  .addEventListener('click', lufthansa.buyPlane.bind(lufthansa));

// Partial application
const addTax = (rate, value) => value + value * rate;
console.log(addTax(0.1, 200));

const addVAT = addTax.bind(null, 0.23);
// addVat = value => value + value * 0.23;

console.log(addVAT(100));

// Challenge
const addTax2 = function (rate) {
  return function (value) {
    return value + value * rate;
  };
};

const addVat2 = addTax2(0.23);
console.log(addVat2(343437));


/////////////////////////////////////////////
/////////////////////////////////////////////
Coding Challenge #1

Let's build a simple poll app!
A poll has a question, an array of options from which people can choose, and an array with the number of replies for each option. This data is stored in the starter 'poll' object below.


Your tasks:

1. Create a method called 'registerNewAnswer' on the 'poll' object. The
method does 2 things:
1.1. Display a prompt window for the user to input the number of the selected option. The prompt should look like this:

What is your favourite programming language?
0: JavaScript
1: Python
2: Rust
3: C++
(Write option number)
1.2. Based on the input number, update the 'answers' array property. For
example, if the option is 3, increase the value at position 3 of the array by

1. Make sure to check if the input is a number and if the number makes
sense (e.g. answer 52 wouldn't make sense, right?)

2. Call this method whenever the user clicks the "Answer poll" button.
3. Create a method 'displayResults' which displays the poll results. The
method takes a string as an input (called 'type'), which can be either 'string'
or 'array'. If type is 'array', simply display the results array as it is, using
console.log(). This should be the default option. If type is 'string', display a
string like "Poll results are 13, 2, 4, 1".

4. Run the 'displayResults' method at the end of each
'registerNewAnswer' method call.

5. Bonus: Use the 'displayResults' method to display the 2 arrays in the test data. Use both the 'array' and the 'string' option. Do not put the arrays in the poll
object! So what should the this keyword look like in this situation?
The Complete JavaScript Course 21
Test data for bonus:
§ Data 1: [5, 2, 3]
§ Data 2: [1, 5, 3, 9, 6, 1]
Hints: Use many of the tools you learned about in this and the last section �
GOOD LUCK �

// ARRAYS FOR THE BONUS
const array1 = [5, 2, 3];
const array2 = [1, 5, 3, 9, 6, 1];

const poll = {
  question: 'What is your favourite programming language?',
  options: ['0: JavaScript', '1: Python', '2: Rust', '3: C++'],
  // This generates [0, 0, 0, 0]. More in the next section!
  answers: new Array(4).fill(0),

  registerNewAnswer() {
    const userAnswer = Number(
      prompt(`${this.question} \n
            ${this.options[0]} \n
            ${this.options[1]} \n
            ${this.options[2]} \n
            ${this.options[3]} \n
            (Write your answer)`)
    );
    if (typeof userAnswer === 'number' && userAnswer >= 0 && userAnswer <= 3) {
      this.answers[userAnswer]++;
      console.log(this.answers);
    } else {
      console.log('Invalid Number');
    }

    this.displayResults();
    this.displayResults('string');
  },

  displayResults(type = 'array') {
    if (type === 'array') {
      console.log(this.answers);
    } else if (type === 'string') {
      console.log(`Poll results are ${this.answers.join(', ')}`);
    }
  },
};

document
  .querySelector('.poll')
  .addEventListener('click', poll.registerNewAnswer.bind(poll));

poll.displayResults.call({ answers: [5, 3, 2] }, 'string');

const runOnce = function () {
  console.log('This will never run again');
};
runOnce();

// Immediately Invoked function Expression
// IIFE
(function (name) {
  console.log(`${name} will never run this again.`);
})('Umer Kang');

(() => console.log('This will ALSO never run again.'))();

const secureBooking = function () {
  let passengerCount = 0;

  return function () {
    passengerCount++;
    console.log(`${passengerCount}: passengers`);
  };
};

const booker = secureBooking();

booker();
booker();
booker();

console.dir(booker);

// Example 1
let f;

const g = function () {
  const a = 23;

  f = function () {
    console.log(a * 2);
  };
};

const h = function () {
  const b = 777;
  f = function () {
    console.log(b * 2);
  };
};

g();
f();
console.dir(f);

// Re-assigning the 'f' function
h();
f();
console.dir(f);

// Example 2

const boardPassengers = function (n, wait) {
  const perGroup = n / 3;

  setTimeout(function () {
    console.log(`We are now boarding all ${n} passengers`);

    console.log(`There are 3 groups, each with ${perGroup} passengers`);
  }, wait * 1000);
  // This callback function will be executed completely independently with respect to the board passengers.

  console.log(`Will start boarding in ${wait} seconds.`);
};

boardPassengers(180, 3);
*/

// CODING CHALLENGE #2

/*
This is more of a thinking challenge than a coding challenge �
Your tasks:

1. Take the IIFE below and at the end of the function, attach an event listener that changes the color of the selected h1 element ('header') to blue, each time the body element is clicked. Do not select the h1 element again!

2. And now explain to yourself (or someone around you) why this worked! Take all the time you need. Think about when exactly the callback function is executed, and what that means for the variables involved in this example.


(function () {
  const header = document.querySelector('h1');
  header.style.color = 'red';

  const headerColorBlue = function () {
    header.style.color = 'lightblue';
  };
  document.querySelector('body').addEventListener('click', headerColorBlue);
})();
*/

