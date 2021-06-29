'use strict';

/////////////////////////////////////////////////
/////////////////////////////////////////////////
// BANKIST APP

// Data
const account1 = {
  owner: 'Jonas Schmedtmann',
  movements: [200, 450, -400, 3000, -650, -130, 70, 1300],
  interestRate: 1.2, // %
  pin: 1111,
};

const account2 = {
  owner: 'Jessica Davis',
  movements: [5000, 3400, -150, -790, -3210, -1000, 8500, -30],
  interestRate: 1.5,
  pin: 2222,
};

const account3 = {
  owner: 'Steven Thomas Williams',
  movements: [200, -200, 340, -300, -20, 50, 400, -460],
  interestRate: 0.7,
  pin: 3333,
};

const account4 = {
  owner: 'Sarah Smith',
  movements: [430, 1000, 700, 50, 90],
  interestRate: 1,
  pin: 4444,
};

const accounts = [account1, account2, account3, account4];

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

// IMPLEMENTING THE FUNCTIONALITY OF THE APP
const displayMovement = function (movements, sort = false) {
  containerMovements.innerHTML = '';

  const movs = sort ? movements.slice().sort((a, b) => a - b) : movements;

  movs.forEach((mov, i) => {
    const type = mov > 0 ? 'deposit' : 'withdrawal';

    const html = `
    <div class="movements__row">
    <div class="movements__type movements__type--${type}">${i + 1} ${type}</div>
    <div class="movements__value">${mov} €</div>
    </div>`;

    containerMovements.insertAdjacentHTML('afterbegin', html);
  });
};
// displayMovement(account1.movements);

const calcDisplayBalance = function (acc) {
  acc.balance = acc.movements.reduce((acc, mov) => acc + mov);
  labelBalance.textContent = `${acc.balance} €`;
};
// calcDisplayBalance(account1.movements);

const calcDisplaySummary = function (acc) {
  const income = acc.movements
    .filter(mov => mov > 0)
    .reduce((acc, mov) => acc + mov, 0);
  labelSumIn.textContent = `${income}€`;

  const outcome = acc.movements
    .filter(mov => mov < 0)
    .reduce((acc, mov) => acc + mov, 0);
  labelSumOut.textContent = `${Math.abs(outcome)}€`;

  const interst = acc.movements
    .filter(mov => mov > 0)
    .map(deposit => (deposit * acc.interestRate) / 100)
    .filter(int => int >= 1)
    .reduce((acc, int) => acc + int);
  labelSumInterest.textContent = `${interst}€`;

  // in chaining AVOID mutating array method
};
// calcDisplaySummary(account1.movements);

const createUserNames = function (accs) {
  accs.forEach(function (acc) {
    acc.username = acc.owner
      .toLowerCase()
      .split(' ')
      .map(username => username[0])
      .join('');
  });
};
createUserNames(accounts);

// USING map method
// accounts.map(accountsObj => createUserNames(accountsObj.owner));

const updateUI = function (acc) {
  // Display movements
  displayMovement(acc.movements);
  // Display balance
  calcDisplayBalance(acc);
  // Display summary
  calcDisplaySummary(acc);
};

// Event Handlers
let currentAccount;

btnLogin.addEventListener('click', function (e) {
  // Prevent form from submitting
  e.preventDefault();
  console.log('LOGIN');

  // if the conditions does not match the find method will return undefined
  currentAccount = accounts.find(
    acc => acc.username === inputLoginUsername.value
  );

  console.log(currentAccount);

  if (currentAccount?.pin === Number(inputLoginPin.value)) {
    // Display UI and a welcome message
    labelWelcome.textContent = `Welcome Back, ${
      currentAccount.owner.split(' ')[0]
    }`;

    containerApp.style.opacity = '1';
    containerApp.style.visibility = 'visible';

    // Clear the input fields
    inputLoginUsername.value = inputLoginPin.value = '';
    // After login the field should lose its focus
    inputLoginPin.blur();

    updateUI(currentAccount);
  }
});

// Transfer functionality
btnTransfer.addEventListener('click', function (e) {
  e.preventDefault();

  const amount = Number(inputTransferAmount.value);
  const receiverAcc = accounts.find(
    acc => acc.username === inputTransferTo.value
  );

  // clearing the values from forms after the function is done
  inputTransferAmount.value = inputTransferTo.value = '';

  if (
    amount > 0 &&
    receiverAcc &&
    amount <= currentAccount.balance &&
    receiverAcc?.username !== currentAccount.username
  ) {
    // Doing the transfer
    currentAccount.movements.push(-amount);
    receiverAcc.movements.push(amount);
    updateUI(currentAccount);
  }
});

// Requesting LOAN from Bank
btnLoan.addEventListener('click', function (e) {
  e.preventDefault();

  const amount = Number(inputLoanAmount.value);

  if (amount > 0 && currentAccount.movements.some(mov => mov >= amount * 0.1)) {
    // adding the positive value (deposit) to the movements
    currentAccount.movements.push(amount);
    // Update UI
    updateUI(currentAccount);
  }

  inputLoanAmount.value = '';
});

btnClose.addEventListener('click', function (e) {
  e.preventDefault();

  if (
    inputCloseUsername.value === currentAccount.username &&
    Number(inputClosePin.value) === currentAccount.pin
  ) {
    // findIndex also takes a boolean value
    const index = accounts.findIndex(
      acc => acc.username === currentAccount.username
    );

    // Delete account
    accounts.splice(index, 1);

    // Hide the UI
    containerApp.style.opacity = 0;
    containerApp.style.visibility = 'hidden';
  }

  // Also this needs to be after the if statement
  // Clearing the values from the form after the function is done
  inputCloseUsername.value = inputClosePin.value = '';
});

// objects are not copied just their reference point are copied

let sorted = false;
btnSort.addEventListener('click', function (e) {
  e.preventDefault();
  displayMovement(currentAccount.movements, !sorted);
  sorted = !sorted;
});

/////////////////////////////////////////////////
/////////////////////////////////////////////////
// LECTURES

const movements = [200, 450, -400, 3000, -650, -130, 70, 1300];

/////////////////////////////////////////////////

// let arr = ['a', 'b', 'c', 'd', 'e'];

/*
/////////////////////////////////////////////////
/////////////////////////////////////////////////
// SIMPLE ARRAY METHODS
// SLICE METHOD
// it does not mutate the array
console.log('----- SLICE -----');
console.log(arr.slice(2));
console.log(arr.slice(2, 4));
// It will only extract the only last TWO elements not THREE
console.log(arr.slice(-2));
console.log(arr.slice(-1));
console.log(arr.slice(1, -2));
// creating a shallow copy of any array
console.log(arr.slice());
// same thing using the spread operators
console.log([...arr]);

// SPLICE METHOD
// it actually mutates the array. it created a new array of the element that we specified through the LENGTH, and it deletes that elements from the original array.
// we are only intersted in splice if we want to delete from the one or more element from the array
console.log('----- SPLICE -----');

// console.log(arr.splice(2));
arr.splice(-1);
arr.splice(1, 2);
console.log(arr);

// REVERSE
// it also changes the original array as the splice method
console.log('----- REVERSE -----');

arr = ['a', 'b', 'c', 'd', 'e'];
const arr2 = ['j', 'i', 'h', 'g', 'f'];
console.log(arr2.reverse());

// CONCAT
console.log('----- CONCAT -----');
const letters = arr.concat(arr2);
console.log(letters);

const letter2 = [...arr, ...arr2];
console.log(letter2);

// JOIN
console.log('----- JOIN -----');
console.log(letters.join(' - '));

////////////////////////////////////////////////
////////////////////////////////////////////////
// USING FOREACH LOOP
const movements = [200, 450, -400, 3000, -650, -130, 70, 1300];
console.log(movements.entries());

console.log('---------- FOR OF LOOP ----------');
// by FOR OF loop
// for (const movement of movements) {
for (const [i, movement] of movements.entries()) {
  if (movement > 0) {
    console.log(`Movement: ${i + 1} -- This is the deposit of ${movement}`);
  } else if (movement < 0) {
    console.log(
      `Movement: ${i + 1} -- This is the widthdrawl of ${Math.abs(movement)}`
    );
  }
}

console.log('---------- FOREACH LOOP ----------');
// by FOR EACH loop
movements.forEach(function (mov, i, arr) {
  if (mov > 0) {
    console.log(`Movement: ${i + 1} -- This is the deposit of ${mov}`);
  } else if (mov < 0) {
    console.log(
      `Movement: ${i + 1} -- This is the widthdrawl of ${Math.abs(mov)}`
    );
  }
});
// EXPLAINATION OF FOREACH LOOP
// 0: function(200)
// 1: function(450)
// 1: function(-400) .....

// IN forEach the first element is current element, second is the index, and the third is the whole array. BUT! in for of LOOP of array.entries() the first element is index and the second element is the current element.

// console.log('---------- FOREACH LOOP ----------');
// movements.forEach(function (mov, i, arr) {
//   console.log(
//     `Bencho! this is Element: ${mov}, index: ${i}, and array: ${arr}`
//   );
//

///////////////////////////////////////////////////
///////////////////////////////////////////////////
// LOOPING OVER MAP WITH FOREACH
const currencies = new Map([
  ['USD', 'United States dollar'],
  ['EUR', 'Euro'],
  ['GBP', 'Pound sterling'],
]);

// for each loop will always put three values as arguments in its callback function: first one is the element, second one is the index and the third one is the whole iterable
currencies.forEach((value, key, wholeMap) => {
  // console.log(wholeMap);
});

// LOOPIN OVER SET WITH FOREACH
const currenciesUnique = new Set(['USD', 'GBP', 'USD', 'EUR', 'EUR']);

currenciesUnique.forEach((value, _, set) => {
  console.log(value);
});

// key is exactly the same as the value
*/

// CODING CHALLENGE #1
/*
Julia and Kate are doing a study on dogs. So each of them asked 5 dog owners about their dog's age, and stored the data into an array (one array for each). For now, they are just interested in knowing whether a dog is an adult or a puppy. A dog is an adult if it is at least 3 years old, and it's a puppy if it's less than 3 years old.

Your tasks:
Create a function 'checkDogs', which accepts 2 arrays of dog's ages ('dogsJulia' and 'dogsKate'), and does the following things:

1. Julia found out that the owners of the first and the last two dogs actually have cats, not dogs! So create a shallow copy of Julia's array, and remove the cat ages from that copied array (because it's a bad practice to mutate function
parameters)

2. Create an array with both Julia's (corrected) and Kate's data

3. For each remaining dog, log to the console whether it's an adult ("Dog number 1 is an adult, and is 5 years old") or a puppy ("Dog number 2 is still a puppy �")

4. Run the function for both test datasets


Test data:
Data 1: Julia's data [3, 5, 2, 12, 7], Kate's data [4, 1, 15, 8, 3]

Data 2: Julia's data [9, 16, 6, 8, 3], Kate's data [10, 5, 6, 1, 4]

// Test data 1
const dogsJulia = [3, 5, 2, 12, 7];
const dogsKate = [4, 1, 15, 8, 3];
// Test data 2
const dogsJulia2 = [9, 16, 6, 8, 3];
const dogsKate2 = [10, 5, 6, 1, 4];

const checkDogs = function (dogsJulia, dogsKate) {
  const dogsJuliaCorrected = dogsJulia.slice();
  dogsJuliaCorrected.splice(-2);
  dogsJuliaCorrected.splice(0, 1);
  // removes one element at index 0;
  console.log(dogsJuliaCorrected);

  // new array of julia's corrected array and kate's array
  const newBothArray = dogsJuliaCorrected.concat(dogsKate);
  console.log(newBothArray);

  // different method of acheving the same thing
  // const newBothArray2 = [...dogsJuliaCorrected, ...dogsKate];
  // console.log(newBothArray2);

  // LOOPING OVER ARRAYS TO FIND WHETHER THE DATA ELEMENT IS DOG OR PUPPY!

  newBothArray.forEach(function (ageDog, i) {
    if (ageDog >= 3)
      console.log(`Dog number ${i + 1} is an adult🐕‍🦺, and ${ageDog} years old`);
    else if (ageDog < 3)
      console.log(
        `Dog number ${i + 1} is an puppy🐶, and ${ageDog} years old.`
      );
  });
};

checkDogs(dogsJulia, dogsKate);
checkDogs(dogsJulia2, dogsKate2);

//////////////////////////////////////////////////
//////////////////////////////////////////////////
// THE MAP METHOD
// the map method returns the new array and does not mutate the original array.
const euroToUsd = 1.1;

const movements = [200, 450, -400, 3000, -650, -130, 70, 1300];

const movementsUSD = movements.map(mov => mov * euroToUsd);

console.log(movements);
console.log(movementsUSD);

// Acheiving the same thing with for of loop
// const movementsUSDFor = [];

// for (const mov of movements) {
//   const movUSD = mov * euroToUsd;
//   movementsUSDFor.push(movUSD);
// }

// console.log(movementsUSDFor);

// just like the forEach method, map method also gets the three parameters, first one is element of iterable, second one is index, and the third one is whole iterable.

const movementsDescription = movements.map(
  (mov, i, arr) =>
    `Movement: ${i + 1} -- This is the ${
      mov > 0 ? 'deposit' : 'withdrew'
    } of ${Math.abs(mov)}`
);

console.log(movementsDescription);

/////////////////////////////////////////////////////////
/////////////////////////////////////////////////////////
// FILTER METHOD
// it also returns the new array
const deposits = movements.filter(mov => mov > 0);

console.log(movements);
console.log(deposits);

// const newArr = [];
// for (const mov of movements) if (mov > 0) newArr.push(mov);

const withdrawal = movements.filter(mov => mov < 0);
console.log(withdrawal);

/////////////////////////////////////////////////////////
/////////////////////////////////////////////////////////
// REDUCE METHOD

console.log(movements);

// Accumulator -> SNOWBALL
// const balance = movements.reduce(function (acc, mov, i, arr) {
//   console.log(`Iteration #${i}: ${acc}`);

//   return acc + mov;
// }, 0);

const balance = movements.reduce((acc, mov, i, arr) => acc + mov, 0);

console.log(balance);

// doing the same thing with for loop
// let sum = 0;
// for (const mov of movements) {
//   sum += mov;
// }

// console.log(sum);

// MAXIMUM VALUE BY REDUCE METHOD

const max = movements.reduce(
  (acc, mov) => (acc > mov ? acc : mov),
  movements[0]
);

console.log(max);

/////////////////////////////////////////////////////////
/////////////////////////////////////////////////////////
// CODING CHALLENGE #3

const testData1 = [5, 2, 4, 1, 15, 8, 3];
const testData2 = [16, 6, 10, 5, 6, 1, 4];

// calculating the average human age
const calcAverageHumanAge = function (ages) {
  const humanAges = ages.map(age => (age <= 2 ? age * 2 : 16 + age * 4));

  const adult = humanAges.filter(age => age >= 18);

  // const average = adult.reduce((acc, age) => acc + age, 0) / adult.length;

  const average = adult.reduce((acc, age, i, arr) => acc + age / arr.length, 0);

  return average;
};

const averageTest1 = calcAverageHumanAge(testData1);
const averageTest2 = calcAverageHumanAge(testData2);

console.log(averageTest1, averageTest2);

/////////////////////////////////////////////////////////
/////////////////////////////////////////////////////////
// THE FIND METHOD

console.log(movements);

// It will return a only first element that will will fulfil the condition
const firstWithdrawal = movements.find(mov => mov < 0);
console.log(firstWithdrawal);

console.log(accounts);

const account = accounts.find(acc => acc.owner === 'Jessica Davis');

console.log(account);

/////////////////////////////////////////////////////////
/////////////////////////////////////////////////////////
// CHAINING ALL THE ARRAY METHODS
const euroToUsd = 1.1;

const totalDepositsUSD = movements
.filter(mov => mov > 0)
// .map(mov => mov * euroToUsd)
.map((mov, i, arr) => {
  // console.log(arr);
  return mov * euroToUsd;
})
.reduce((acc, mov) => acc + mov, 0);

// As reduce return a value not a array so we cannot chain the more array methods on it
console.log(totalDepositsUSD);

/////////////////////////////////////////////////////////
/////////////////////////////////////////////////////////
// CODING CHALLENGE #3
// rewriting the whole challenge #2 in arrow function and chaining of methods.

const testData1 = [5, 2, 4, 1, 15, 8, 3];
const testData2 = [16, 6, 10, 5, 6, 1, 4];

// calculating the average human age of dogs
const calcAverageHumanAge = ages =>
  ages
    .map(age => (age <= 2 ? age * 2 : 16 + age * 4))
    .filter(age => age >= 18)
    .reduce((acc, age, i, arr) => acc + age / arr.length, 0);

const averageTest1 = calcAverageHumanAge(testData1);
const averageTest2 = calcAverageHumanAge(testData2);

console.log(averageTest1, averageTest2);

//////////////////////////////////////////////////////
//////////////////////////////////////////////////////
// SOME AND EVERY METHOD
// some
console.log(movements);

// It checks for EQUILITY
// console.log(movements.includes(-130));

// Here we can Specify the CONDITION
// console.log(movements.some(mov => mov === -130));

const anyDeposits = movements.some(mov => mov > 1000);

// every method
const allDeposits = movements.every(mov => mov > 0);

// Seperate callback function
const deposit = mov => mov > 0;

const allDeposits4 = account4.movements.every(deposit);
console.log(allDeposits4);

console.log(movements.some(deposit));
console.log(movements.every(deposit));
console.log(movements.filter(deposit));

///////////////////////////////////////////////////////
///////////////////////////////////////////////////////
// FLAT AND FLAT MAP METHODS

const arr = [[1, 2, 3], [4, 5, 6], 7, 8];
// it removes the nested arrays and return the flattened array
console.log(arr.flat());

const arrDeep = [[[1, 2], 3], [4, [5, 6]], 7, 8];
console.log(arrDeep.flat(2));

// Flat
const overallBalance = accounts
.map(acc => acc.movements)
.flat()
.reduce((acc, mov) => acc + mov);

console.log(overallBalance);

// Flat Map
const overallBalance2 = accounts
.flatMap(acc => acc.movements)
.reduce((acc, mov) => acc + mov);
console.log(overallBalance2);

//////////////////////////////////////////////////////
//////////////////////////////////////////////////////
// SORTING METHOD
// Strings
const owner = ['Jonas', 'Zack', 'Adam', 'Martha'];
console.log(owner.sort());
console.log(owner);

// Numbers
// sort method does only works with strings in arrays
// return < 0   A, B (keep order)
// return > 0   B, A (switch order)
// ASCENDING ORDER
console.log(movements);
// movements.sort((a, b) => {
  //   if (a > b) return 1;
  //   if (a < b) return -1;
  // });
  // console.log(movements);
  
  movements.sort((a, b) => a - b);
  console.log(movements);
  
  // DESCENDING ORDER
  movements.sort((a, b) => b - a);
  
  // here we are mutating the array
  console.log(movements);

const arr = [1, 2, 3, 4, 5, 6, 7];

// Empty arrays + fill method
console.log(new Array(1, 3, 34, 34, 3, 3));

const x = new Array(7);

x.fill(3, 3, 5); // the final index does not gonna fill up
console.log(x);

arr.fill(23, 2, 5);
console.log(arr);

// array.from
const y = Array.from({ length: 7 }, arr => 91);
console.log(y);

const z = Array.from({ length: 7 }, (_, i) => i + 1);
console.log(z);

const radomDiceRoll = Array.from({ length: 100 }, () =>
  Math.trunc(Math.random() * 100 + 1)
);

console.log(radomDiceRoll);

// converting to array from Array.nodelist

labelBalance.addEventListener('click', function () {
  const movementsUI = Array.from(
    document.querySelectorAll('.movements__value'),
    element => Number(element.textContent.replace('€', ''))
  );

  console.log(movementsUI);

  const movementsUI2 = [...document.querySelectorAll('.movements__value')];

  console.log(movementsUI2);

  // const movementsUI = document.querySelectorAll('.movements__value');
  // console.log(
  //   movementsUI.map(element => Number(element.textContent.replace('€', '')))
  // );
});

// CODING CHALLENGE #4
const dogs = [
  { weight: 22, curFood: 250, owners: ['Alice', 'Bob'] },
  { weight: 8, curFood: 200, owners: ['Matilda'] },
  { weight: 13, curFood: 275, owners: ['Sarah', 'John'] },
  { weight: 32, curFood: 340, owners: ['Michael'] },
];

// 1. Loop over the array to find the RECOMMENDED FOOD
dogs.forEach(dog => (dog.recFood = Math.trunc(dog.weight ** 0.75 * 28)));
console.log(dogs);

// 2. Find Sarah's dog, if it's eating too much or too low, or normal
const sarahsDog = dogs.find(dog => dog.owners.some(owner => owner === 'Sarah'));

console.log(
  `Sarah's dog is eating too ${
    sarahsDog.curFood > sarahsDog.recFood ? 'much' : 'little'
  }`
);

// 3. Create a new array who eats too much, or two low

const ownersTooMuch = dogs
  .filter(dog => dog.curFood > dog.recFood)
  .flatMap(arr => arr.owners);

console.log(ownersTooMuch);

const ownersTooLess = dogs
  .filter(dog => dog.curFood < dog.recFood)
  .flatMap(acc => acc.owners);

console.log(ownersTooLess);

// 4.
const tooMuchStr = ownersTooMuch.join(' and ');
console.log(`${tooMuchStr}'s dogs eat too much`);

const tooLessStr = ownersTooLess.join(' and ');
console.log(`${tooLessStr}'s dogs eat too less`);

// 5.
console.log(dogs.some(dog => dog.curFood === dog.recFood));

// 6.
console.log(
  dogs.some(
    dog => dog.curFood < dog.recFood * 1.1 && dog.curFood > dog.recFood * 0.9
  )
);

// 7.
console.log(
  dogs.filter(
    dog => dog.curFood < dog.recFood * 1.1 && dog.curFood > dog.recFood * 0.9
  )
);

const sortedArray = dogs.slice().sort((a, b) => a.recFood - b.recFood);
console.log(sortedArray);

// ARRAY PRACTICE METHODS
// 1)
const bankDepositSum = accounts
  .flatMap(account => account.movements)
  .filter(mov => mov > 0)
  .reduce((acc, mov) => acc + mov, 0);

console.log(bankDepositSum);

// 2)
const numDeposit1000 = accounts
  .flatMap(acc => acc.movements)
  .reduce((accumulator, cur) => (cur >= 1000 ? ++accumulator : accumulator), 0);

console.log(numDeposit1000);

// it is because the ++ operator does its job (that is changing the original value by 1 but it doesn't return that increased value but it returns the previous(old) value)

// 3)
const { deposits, widthdrawal } = accounts
  .flatMap(acc => acc.movements)
  .reduce(
    (sums, cur) => {
      // cur > 0 ? (sums.deposits += cur) : (sums.widthdrawal += cur);

      sums[cur > 0 ? 'deposits' : 'widthdrawal'] += cur;
      return sums;
    },
    { deposits: 0, widthdrawal: 0 }
  );

console.log(deposits, widthdrawal);

// 4)
const convertTitleCase = function (title) {
  const exceptions = ['a', 'an', 'the', 'but', 'and', 'or', 'on', 'in', 'with'];

  const capitalize = str => str[0].toUpperCase() + str.slice(1);

  const titleCase = title
    .toLowerCase()
    .split(' ')
    .map(word => (exceptions.includes(word) ? word : capitalize(word)))
    .join(' ');
  return capitalize(titleCase);
};

console.log(convertTitleCase('this is a nice title'));
console.log(convertTitleCase('this is a LONG title but not too long'));
console.log(convertTitleCase('and here is an another title with an EXAMPLE'));
*/
