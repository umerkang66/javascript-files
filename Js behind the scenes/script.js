'use strict';
/*
function calcAge(birthYear) {
  const age = 2037 - birthYear;

  function printAge() {
    let output = `${firstName}, you are ${age}, and born in ${birthYear}`;
    console.log(output);

    if (birthYear >= 1981 && birthYear <= 1996) {
      var millenial = true;

      // creating New variables with same name as in the outer scope variables
      const firstName = 'Umer';

      // reassigning outer scope variables
      output = 'NEW OUTPUT!';
      const str = `Oh, ${firstName}, you're a millenial`;
      console.log(str);

      function add(a, b) {
        return a + b;
      }
      console.log(output);
    }
    console.log(output);
    // console.log(str);
    console.log(millenial);
    // console.log(add(4, 5));
  }

  printAge();
  return age;
}

const firstName = 'Jonas';
calcAge(1991);
*/

// HOISTING WITH VARIABLES
// console.log(me);
// console.log(job);
// console.log(year);

// var me = 'jonas';
// let job = 'teacher';
// const year = 1991;

// // HOISTING WITH FUNCTIONS

// console.log(addDecl(2, 3));
// console.log(addExpr(2, 3));
// console.log(addArrow(2, 3));

// function addDecl(a, b) {
//   return a + b;
// }

// const addExpr = function (a, b) {
//   return a + b;
// };

// var addArrow = (a, b) => a + b;

// EXAMPLE
// console.log(numProduct);
// if (!numProduct) deleteShoppingCard();

// var numProduct = 10;
// function deleteShoppingCard() {
//   console.log('All products deleted!');
// }

// var x = 1;
// let y = 2;
// const z = 3;

// console.log(x === window.x);
// console.log(y === window.y);
// console.log(z === window.z);

// console.log(this);
/*
const calcAge = function (birthYear) {
  // console.log(2037 - birthYear);
  // console.log(this);
};

calcAge(1991);

const calcAgeArrow = birthYear => {
  // console.log(2037 - birthYear);
  // console.log(this);
};

calcAgeArrow(1990);

const jonas = {
  year: 1991,
  calcAge: function () {
    console.log(this);
    console.log(2037 - this.year);
  },
};

jonas.calcAge();

const matilda = {
  year: 2017,
};

matilda.calcAge = jonas.calcAge;

matilda.calcAge();

const f = jonas.calcAge;
f();
*/

// var firstName = 'Matilda';
/*
const jonas = {
  firstName: 'jonas',
  year: 1991,
  calcAge: function () {
    // console.log(this);
    console.log(2037 - this.year);

    // SOLUTION 1: PRE ES6
    // const self = this;
    // const isMillenial = function () {
    //   console.log(self.year);
    //   console.log(self.year >= 1981 && self.year <= 1996);

    //   // console.log(this.year);
    //   // console.log(this.year >= 1981 && this.year <= 1996);
    // };

    // SOLUTION 2: POST ES6
    const isMillenial = () => {
      console.log(this);
      console.log(this.year >= 1981 && this.year <= 1996);
    };

    isMillenial();
  },

  greet: () => {
    console.log(this);
    console.log(`Hey ${this.firstName}`);
  },
};

jonas.calcAge();
jonas.greet();

// ARGUMENTS KEYWORDS
const addExpr = function (a, b) {
  console.log(arguments);
  return a + b;
};
console.log(addExpr(2, 5, 8, 12));

var addArrow = (a, b) => {
  console.log(arguments);
  return a + b;
};

console.log(addArrow(2, 5, 8, 12));
*/
/*
let age = 30;
let oldAge = age;
age = 31;

console.log(age);
console.log(oldAge);

const me = {
  name: 'jonas',
  age: 30,
};
const friend = me;
friend.age = 27;

console.log('Friend:', friend);
console.log('Me: ', me);
*/
/*
// PRIMTIVES TYPES
let lastName = 'Williams';
let oldLastName = lastName;
lastName = 'Davis';

console.log(lastName, oldLastName);

// REFERENCE TYPES
const jessica = {
  firstName: 'Jessica',
  lastName: 'Williams',
  age: 27,
};

const marriedJessica = jessica;
marriedJessica.lastName = 'Davis';

console.log('Before marriage:', jessica);
console.log('After marriage:', marriedJessica);

// COPYING OBJECTS
const jessica2 = {
  firstName: 'Jessica',
  lastName: 'Williams',
  age: 27,
  family: ['Alice', 'Bob'],
};

const jessicaCopy = Object.assign({}, jessica2);
jessicaCopy.lastName = 'Umer';

// console.log('Before marriage:', jessica2);
// console.log('After marriage:', jessicaCopy);

jessicaCopy.family.push('Mary');
jessicaCopy.family.push('John');

console.log('Before marriage:', jessica2);
console.log('After marriage:', jessicaCopy);
*/
