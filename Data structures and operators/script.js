/*
'use strict';

const weekdays = ['mon', 'tue', 'wed', 'thurs', 'fri', 'sat', 'sun'];

const openingHours = {
  [weekdays[3]]: {
    open: 12,
    close: 22,
  },
  [weekdays[4]]: {
    open: 11,
    close: 23,
  },
  [weekdays[5]]: {
    open: 0, // Open 24 hours
    close: 24,
  },
};

const restaurant = {
  name: 'Classico Italiano',
  location: 'Via Angelo Tavanti 23, Firenze, Italy',
  categories: ['Italian', 'Pizzeria', 'Vegetarian', 'Organic'],
  starterMenu: ['Focaccia', 'Bruschetta', 'Garlic Bread', 'Caprese Salad'],
  mainMenu: ['Pizza', 'Pasta', 'Risotto'],

  // openingHours: openingHours,

  // ES6 ENHANCED OBJECT LITERALS
  openingHours,

  order(starterIndex, mainIndex) {
    return [this.starterMenu[starterIndex], this.mainMenu[mainIndex]];
  },

  orderDelivery({ starterIndex = 1, mainIndex = 0, time = '20:00', address }) {
    console.log(
      `Order received! ${this.starterMenu[starterIndex]} and ${this.mainMenu[mainIndex]} will be deliverd to your address, ${address}, at ${time} with.`
    );
  },

  orderPasta(ing1, ing2, ing3) {
    console.log(
      `Here is your delicious Pasta with ${ing1}, ${ing2}, and ${ing3}.`
    );
  },

  orderPizza(mainIngredient, ...otherIngredients) {
    console.log(mainIngredient);
    console.log(otherIngredients);
  },
};
/*
Write a program that receives a list of variable names written in underscore_case
and convert them to camelCase.
The input will come from a textarea inserted into the DOM (see code below to
insert the elements), and conversion will happen when the button is pressed.
Test data (pasted to textarea, including spaces):
 underscore_case
first_name
Some_Variable
 calculate_AGE
delayed_departure
Should produce this output (5 separate console.log outputs):
underscoreCase   ✅
firstName        ✅✅
someVariable     ✅✅✅
calculateAge     ✅✅✅✅
delayedDeparture ✅✅✅✅✅
Hints:
§ Remember which character defines a new line in the textarea �
§ The solution only needs to work for a variable made out of 2 words, like a_b
§ Start without worrying about the ✅. Tackle that only after you have the variable
name conversion working �
§ This challenge is difficult on purpose, so start watching the solution in case
you're stuck. Then pause and continue!
Afterwards, test with your own test data!
GOOD LUCK �

document.body.append(document.createElement('textarea'));
document.body.append(document.createElement('button'));

document.querySelector('button').addEventListener('click', function () {
  const text = document.querySelector('textarea').value;
  const textSplit = text.split('\n');

  for (const [index, row] of textSplit.entries()) {
    const [first, second] = row.toLowerCase().trim().split('_');
    const output = `${first}${second.replace(
      second[0],
      second[0].toUpperCase()
    )}`;

    const outputPad = `${output.padEnd(18)}${'✅'.repeat(index + 1)}`;
    console.log(outputPad);
  }
});
/*
//////////////////////////////////////////////////////
//////////////////////////////////////////////////////
// WORKING WITH STRINGS: PART 3

// split and join
console.log('a+very+nice+string'.split('+'));
console.log('Jonas Schmedtmann'.split(' '));

const [firstName, lastName] = 'Jonas Schmedtmann'.split(' ');

const newName = ['Mr.', firstName, lastName.toUpperCase()].join(' ');
console.log(newName);

const capitalizeName = function (name) {
  const names = name.split(' ');
  const namesUpper = [];

  for (const n of names) {
    // namesUpper.push(n[0].toUpperCase() + n.slice(1));

    namesUpper.push(n.replace(n[0], n[0].toUpperCase()));
  }
  console.log(namesUpper.join(' '));
};

capitalizeName('jessica ann smith davis');
capitalizeName('jonas schmedtmann');

// Padding
const message = 'Go to gate 23!';
console.log(message.padStart(20, '+').padEnd(30, '+'));
console.log('jonas'.padStart(20, '+').padEnd(30, '+'));

const maskCreditCard = function (number) {
  const str = number + '';
  const last = str.slice(-4).padStart(str.length, '*');
  return last;
};

console.log(maskCreditCard(74756839));
console.log(maskCreditCard(747834765568394));
console.log(maskCreditCard('985938573207527502'));

// Repeat Methods

const message2 = 'Bad weather... All depatured delayed... \n';
console.log(message2.repeat(5));

const planesInLine = function (n) {
  console.log(`There are ${n} number of planes in line ${'✈'.repeat(n)}.`);
};

planesInLine(5);
planesInLine(13);

/*
//////////////////////////////////////////////////////
//////////////////////////////////////////////////////
// WORKING WITH STRINGS: PART 2

const airline = 'TAP Air Portugal';
console.log(airline.toLowerCase());
console.log(airline.toUpperCase());

// Fix capitalization in name
console.log('---- Fix capitalization ----');
// Funcion just created for fun
const passengerCorrectFunction = function (name) {
  const passengerLowerCase = name.toLowerCase();
  const passengerCorrectName =
    passengerLowerCase[0].toUpperCase() + passengerLowerCase.slice(1);

  console.log(passengerCorrectName);
};

passengerCorrectFunction('uMerKAnG');
passengerCorrectFunction('gULZaR');

const passenger = 'jOnAS'; // Jonas
const passengerLowerCase = passenger.toLowerCase();
const passengerCorrect =
  passengerLowerCase[0].toUpperCase() + passengerLowerCase.slice(1);

console.log(passengerCorrect);

// Comparing emails

// function just created for fun
const emailCorrectFunction = function (email, loginEmail) {
  const normalizedEmail = loginEmail.toLowerCase().trim();
  if (email === normalizedEmail) return true;
  else return false;
};

console.log('---- Comparing emails ----');
const email = 'hello@jonas.io';
const loginEmail = '  Hello@Jonas.Io \n';

// const lowerEmail = loginEmail.toLowerCase();
// const trimmedEmail = lowerEmail.trim();

const normalizedEmail = loginEmail.toLowerCase().trim();
console.log(normalizedEmail);
console.log(email === normalizedEmail);

console.log(emailCorrectFunction(email, loginEmail)); // It should be true

// trimStart and trimEnd as their name says they only trim a string from start(trimStart) and from end(trimEnd)

// replacing parts of strings
const priceGB = '288,97Rs';
const priceUS = priceGB.replace('Rs', '$').replace(',', '.');
console.log(priceUS);

const announcement =
  'All passengers come to boarding door 23. Boarding door 23!';

const announcementCorrect = announcement.replaceAll('door', 'gate'); // IT IS WORKING WHEN I AM WATCHING THIS IN JANUARY 2021 // As a sidenote the REPLACE METHOD is also CASE sensitive
console.log(announcementCorrect);

const announcementCorrect2 = announcement.replace(/door/g, 'gate'); // This is so called regular expression
console.log(announcementCorrect2);

// BOOLEANS: Three simple METHODS: Includes, StartsWith, EndsWith

const plane = 'Airbus A320neo';
console.log(plane.includes('A320'));
console.log(plane.includes('Boeing'));
console.log(plane.startsWith('Air'));

if (plane.startsWith('Airbus') && plane.endsWith('neo'))
  console.log('Part of the NEW Airbus family');

// Pracice exercise
const checkBaggage = function (items) {
  const baggage = items.toLowerCase();

  if (baggage.includes('knife') || baggage.includes('gun')) {
    console.log('You are NOT allowed on board');
  } else {
    console.log('Welcome Aboard');
  }
};

checkBaggage('I have a laptop, some Food, and pocket Knife');
checkBaggage('Socks and a camera');
checkBaggage('Got some snacks, and a gun for protection');

/*
//////////////////////////////////////////////////////
//////////////////////////////////////////////////////
// WORKING WITH STRINGS: PART 1
const airline = 'TAP Air Portugal';
const plane = 'A320';
console.log(plane[0]);
console.log('B737'[0]);

console.log(airline.length);
console.log('B737'.length);

console.log(airline.indexOf('r'));
console.log(airline.lastIndexOf('r'));
console.log(airline.indexOf('Portugal'));

console.log(airline.slice(4));
console.log(airline.slice(4, 7));

console.log(airline.slice(0, airline.indexOf(' ')));
console.log(airline.slice(airline.lastIndexOf(' ') + 1));

console.log(airline.slice(-3));
console.log(airline.slice(1, -1));

const checkMiddleSeat = function (seat) {
  // B and E are middle seats
  const s = seat.slice(-1);
  if (s === 'B' || s === 'E') console.log(`You got the middle seat 😫`);
  else console.log(`You go lucky 😎`);
};

checkMiddleSeat('11B');
checkMiddleSeat('23C');
checkMiddleSeat('3E');

// All string methods return PRIMITIVES
// METHODS works on the strings because in the background the string is converted into an object and on that place METHODS are called. and when the operation is done The Object is again converted into a primitives

console.log(new String('jonas'));
console.log(typeof new String('jonas'));
console.log(typeof new String('jonas').slice(1));

/*
// MAP ITERATIONS
//////////////////////////////////////////////////////////
//////////////////////////////////////////////////////////
const question = new Map([
  ['question', 'What is the best programming language in the world?'],
  [1, 'C'],
  [2, 'Java'],
  [3, 'JavaScript'],
  ['correct', 3],
  [true, 'Correct 🎉'],
  [false, 'Try Again!'],
]);

console.log(question);

// CONVERT OBJECT TO MAP
// console.log(Object.entries(openingHours));
const hourMap = new Map(Object.entries(openingHours));
console.log(hourMap);

// QUIZ APP
console.log(question.get('question'));
for (const [key, value] of question) {
  if (typeof key === 'number') {
    console.log(`Answer ${key}: ${value}`);
  }
}

// const answer = Number(prompt(question.get('question')));

// if (question.get('correct') === answer) {
//   console.log(question.get(true));
// } else if (answer === 1 || answer === 2) {
//   console.log(question.get(false));
// } else {
//   console.log('Invalid Number');
// }

// jonas solution
// console.log(question.get(question.get('correct') === answer));

// convert map to array

console.log([...question]);

console.log([...question.entries()]);
console.log([...question.values()]);
console.log([...question.keys()]);

/*
// MAPS FUNDAMENTALS
////////////////////////////////////////////////
////////////////////////////////////////////////
const rest = new Map();
rest.set('name', 'Classico Italiano');
rest.set(1, 'Frenze, Italy');
rest.set(2, 'Lisbon, Portugal');

rest
  .set('categories', ['Italian', 'Pizzeria', 'Vegetarian', 'Organic'])
  .set('open', 11)
  .set('close', 23)
  .set(true, 'we are open :D')
  .set(false, 'we are close :(');

console.log(rest.get('name'));
console.log(rest.get(true));

const time = 2;
console.log(rest.get(time > rest.get(open) && time < rest.get(close)));

console.log(rest.has('categories'));

rest.delete(2);

const arr = [1, 2];
rest.set(arr, 'Test');
rest.set(document.querySelector('h1'), 'heading');
console.log(rest);
console.log(rest.size);

console.log(rest.get(arr));

// rest.clear();
// console.log(rest);

// const values = Object.values(openingHours);
// console.log(values);

// const properties = Object.keys(openingHours);
// console.log(properties);

// const entries = Object.entries(openingHours);
// console.log(entries);
/*
// DATA STRUCTURE : SET
/////////////////////////////////////////////////////
/////////////////////////////////////////////////////
const orderSet = new Set([
  'pasta',
  'pizza',
  'pizza',
  'risotto',
  'pasta',
  'pizza',
]);

console.log(orderSet);

// console.log(new Set('Jonas'));
console.log(orderSet.size);
console.log(orderSet.has('pizza'));
console.log(orderSet.has('bread'));

orderSet.add('garlic bread');
orderSet.add('garlic bread');
orderSet.delete('risotto');
// orderSet.clear();
console.log(orderSet);

for (const order of orderSet) {
  console.log(order);
}

const staff = ['waiter', 'chef', 'waiter', 'manager', 'chef', 'waiter'];

const staffUnique = [...new Set(staff)];
console.log(staffUnique);

const staffUnique2 = new Set(staff);
console.log(staffUnique2.size);

console.log(
  new Set(['waiter', 'chef', 'waiter', 'manager', 'chef', 'waiter']).size
);

console.log(new Set('jonasschmedtmann').size);
/*
// LOOPING OVER OBJECTS

// Properties NAMES
const properties = Object.keys(openingHours);
console.log(properties);

let openStr = `We are open ${properties.length} days: `;

for (const day of properties) {
  openStr += `${day}, `;
}

console.log(openStr);

// Properties VALUES
const values = Object.values(openingHours);
console.log(values);

// Entire Object
const entries = Object.entries(openingHours);
console.log(entries);

for (const [day, { open, close }] of entries) {
  console.log(`On ${day} we open at ${open}, and close at ${close}`);
}

/*

if (restaurant.openingHours.mon) console.log(restaurant.openingHours.mon.open);

// RECREATING WITH OPTIONAL CHAINING
console.log(restaurant.openingHours.mon?.open);
console.log(restaurant.openingHours?.mon?.open);

const days = ['mon', 'tue', 'wed', 'thurs', 'fri', 'sat', 'sun'];

for (const day of days) {
  // console.log(day);
  const open = restaurant.openingHours[day]?.open ?? 'closed';

  console.log(`On ${day}, we open at ${open}`);
}

// OPTIONAL CHAINING WORKS ON METHODS

console.log(restaurant.order?.(0, 1) ?? 'Method does not exist');
console.log(restaurant.orderRisotto?.(0, 1) ?? 'Method does not exist');

// OPTIONAL CHAINING WORKS ON ARRAYS

const user = [{ name: 'Jonas', email: 'hello@jonas.io' }];
// const user = [];
console.log(user[0]?.name ?? 'User Array empty');
console.log(user[0]?.email ?? 'User Array empty');
// console.log(user[1]?.name);

/*
////////////////////////////////////////////
////////////////////////////////////////////
// Looping arrays The FOR OF LOOP
const menu = [...restaurant.starterMenu, ...restaurant.mainMenu];
console.log(menu);

for (const item of menu) console.log(item);

for (const [i, el] of menu.entries()) {
  console.log(`${i + 1}: ${el}`);
}

// console.log([...menu.entries()]);

/*
restaurant.numGuest = 0;
const guest = restaurant.numGuest || 10;
console.log(guest);

// works with the idea of NULLISH VALUES instead falsy values
// And nullish values are null and undefined (it DOES NOT include the ZERO or the EMPTY STRING '')
const guessCorrect = restaurant.numGuest ?? 10;
console.log(guessCorrect);

// SHORT CIRCUITING (&& ||)
////////////////////////////////////////////////////
////////////////////////////////////////////////////
// Use ANY data type, return ANY data type, and do something called SHORT CIRCUITING
console.log('------ OR ------');
console.log(0 || 'jonas');
console.log('' || 'jonas');
console.log(true || 0);
console.log(undefined || null);

console.log(undefined || 0 || '' || 'Hello' || 23 || null);

restaurant.numGuest = 0;
const guest1 = restaurant.numGuest ? restaurant.numGuest : 10;
console.log(guest1);

// if restaurant.numGuest is undefiend and undefined is falsy value so, it will move to the next value: 10
const guest2 = restaurant.numGuest || 10;
console.log(guest2);

console.log('------ AND ------');
console.log(0 && 'jonas');
console.log(7 && null);

console.log(0 || undefined || null || 'jonas');
console.log('Hello' && 23 && null && 'jonas');

// Practical example
if (restaurant.orderPizza) {
  restaurant.orderPizza('Mushrooms', 'Spinach');
}

restaurant.orderPizza && restaurant.orderPizza('Mushroom', 'Spinach');

/*
// DESTRUCTURING

// SPREAD: Because on the RIGHT of the assignment operator (=)
const arr = [1, 2, ...[5, 6]];
console.log(arr);

// REST: Because on the LEFT of the assignment operator (=)
const [a, b, ...others] = [1, 2, 3, 4, 5];
console.log(a, b, others);
// const [...other] = [1, 2, 3, 4, 5];
// console.log(other);

const [pizza, , risotto, ...otherFood] = [
  ...restaurant.mainMenu,
  ...restaurant.starterMenu,
];

console.log(pizza, risotto, otherFood);

// OBJECTS: Rest operator

// const { sat, ...weekdays } = { ...restaurant.openingHours };
const { sat, ...weekdays } = restaurant.openingHours;
console.log('Saturday: ', sat, 'Weekdays: ', weekdays);

// FUNCTIONS

const add = function (...numbers) {
  // Rest operators
  let sum = 0;
  for (let i = 0; i < numbers.length; i++) {
    sum += numbers[i];
  }

  console.log(sum);
};
add(2, 3);
add(5, 7, 2, 3);
add(8, 2, 5, 3, 2, 1, 4);

const x = [23, 5, 7];
add(...x); // Spread operators

restaurant.orderPizza('Mushrooms', 'Onions', 'Olives', 'Spinach');
restaurant.orderPizza('Mushrooms');
// restaurant.orderPizza('Mushrooms');

// THE SPREAD OPERATORS
//////////////////////////////////////////////////
//////////////////////////////////////////////////
/*
const arr = [7, 8, 9];
const badNewArr = [1, 2, arr[0], arr[1], arr[2]];
console.log(badNewArr);
// SPREAD OPERATOR

const newArr = [1, 2, ...arr];
console.log(newArr);

console.log(...newArr);

const newMainMenu = [...restaurant.mainMenu, 'Gnocci'];
console.log(newMainMenu);

// COPY ARRAYS
const mainMenuCopy = [...restaurant.mainMenu];
console.log(mainMenuCopy);
// JOIN 2 ARRAYS OR MORE
const menu = [...restaurant.mainMenu, ...restaurant.starterMenu];
console.log(menu);

// REAL WORLD EXAMPLES
// ITERABLES: arrays, strings, maps, sets, But NOT objects
const str = 'Jonas';
const letters = [...str, ' ', 'S.'];
console.log(letters);
console.log(...str);

// const ingredients = [
//   prompt("let's make pasta with Ingredient 1:"),
//   prompt('Ingredient 2:'),
//   prompt('Ingredient 3:'),
// ];
// // console.log(ingredients);

// // restaurant.orderPasta(ingredients[0], ingredients[1], ingredients[2]);

// restaurant.orderPasta(...ingredients);

// OBJECTS: SPREAD OPERATORS, ES8

const newRestaurant = { foundingYear: 1998, ...restaurant, founder: 'Umer' };

console.log(newRestaurant);

const newRestaurantCopy = { ...newRestaurant };
console.log(newRestaurantCopy);

newRestaurantCopy.name = 'Ristorante Roma';
console.log(newRestaurantCopy.name);
console.log(restaurant.name);


// DESTRUCTURING OBJECTS
//////////////////////////////////////////////////
//////////////////////////////////////////////////
/*
restaurant.orderDelivery({
  time: '23:30',
  address: 'Via del Sole, 21',
  mainIndex: 2,
  starterIndex: 2,
});

restaurant.orderDelivery({
  address: 'Via del Sole, 21',
  starterIndex: 1,
});

// DESTRUCTURING OBJECTS

const { nameR, openingHours, categories } = restaurant;
console.log(nameR, openingHours, categories);

const {
  nameR: restaurantName,
  openingHours: hours,
  categories: tags,
} = restaurant;

console.log(restaurantName, hours, tags);

// DEFAULT VALUES
const { menu = [], starterMenu: starters = [] } = restaurant;
console.log(menu, starters);

// MUTATING VARIABLES
let a = 111;
let b = 999;
const obj = { a: 23, b: 7, c: 14 };
({ a, b } = obj);
console.log(a, b);

// NESTED OBJECTS

const {
  fri: { open: o, close: c },
} = openingHours;
console.log(o, c);

//////////////////////////////////////////////////
//////////////////////////////////////////////////
// DESTRUCTURING ARRAYS
/*
const arr = [2, 3, 4];
const a = arr[0];
const b = arr[1];
const c = arr[2];

const [x, y, z] = arr;
console.log(x, y, z);

console.log(arr);

let [main, , secondary] = restaurant.categories;
console.log(main, secondary);

// SWITCHING VARIABLES
// const temp = main;
// main = secondary;
// secondary = temp;
// console.log(main, secondary);

[main, secondary] = [secondary, main];
console.log(main, secondary);

// RECEIVE 2 RETURN VALUES FROM THE FUNCTION
console.log(restaurant.order(2, 0));
const [starter, mainCourse] = restaurant.order(2, 0);
console.log(starter, mainCourse);

// NESTED DESTRUCTURING
const nested = [2, 4, [5, 6]];
// const [nestedFirst, , nestedthird] = nested;
// console.log(nestedFirst, nestedthird);

const [i, , [j, k]] = nested;
console.log(i, j, k);

// DEFAULT VALUES
const defaultValue = [8];
const [p = 1, q = 1, r = 1] = defaultValue;
console.log(p, q, r);
*/

/*
Coding Challenge #1
We're building a football betting app (soccer for my American friends �)!
Suppose we get data from a web service about a certain game ('game' variable on
next page). In this challenge we're gonna work with that data.
Your tasks:

1. Create one player array for each team (variables 'players1' and
'players2')
2. The first player in any player array is the goalkeeper and the others are field
players. For Bayern Munich (team 1) create one variable ('gk') with the
goalkeeper's name, and one array ('fieldPlayers') with all the remaining 10
field players
3. Create an array 'allPlayers' containing all players of both teams (22
players)
4. During the game, Bayern Munich (team 1) used 3 substitute players. So create a
new array ('players1Final') containing all the original team1 players plus
'Thiago', 'Coutinho' and 'Perisic'
5. Based on the game.odds object, create one variable for each odd (called
'team1', 'draw' and 'team2')
6. Write a function ('printGoals') that receives an arbitrary number of player
names (not an array) and prints each of them to the console, along with the
number of goals that were scored in total (number of player names passed in)
7. The team with the lower odd is more likely to win. Print to the console which
team is more likely to win, without using an if/else statement or the ternary
operator.
Test data for 6.: First, use players 'Davies', 'Muller', 'Lewandowski' and 'Kimmich'.
Then, call the function again with players from game.scored
GOOD LUCK 

const game = {
  team1: 'Bayern Munich',
  team2: 'Borrussia Dortmund',
  players: [
    [
      'Neuer',
      'Pavard',
      'Martinez',
      'Alaba',
      'Davies',
      'Kimmich',
      'Goretzka',
      'Coman',
      'Muller',
      'Gnarby',
      'Lewandowski',
    ],
    [
      'Burki',
      'Schulz',
      'Hummels',
      'Akanji',
      'Hakimi',
      'Weigl',
      'Witsel',
      'Hazard',
      'Brandt',
      'Sancho',
      'Gotze',
    ],
  ],
  score: '4:0',
  scored: ['Lewandowski', 'Gnarby', 'Lewandowski', 'Hummels'],
  date: 'Nov 9th, 2037',
  odds: {
    team1: 1.33,
    x: 3.25,
    team2: 6.5,
  },
};

// CODING CHALLENGE #1 SOLVED
// 1. Creating one player array for EACH TEAM
console.log('------------------------ 1 ------------------------');
const [player1, player2] = game.players;
console.log(player1);
console.log(player2);

// 2. For team 1, 'gk' variable for the First Player(goalkeeper) and 'fieldPlayers' variable for the rest of 10 players
console.log('------------------------ 2 ------------------------');
const [gk, ...fieldPlayers] = player1;
console.log(gk);
console.log(fieldPlayers);
// console.log(fieldPlayers);

// 3. Create an array that will contain the all players of BOTH TEAMS (22 PLAYERS)
console.log('------------------------ 3 ------------------------');
const allPlayers = [...player1, ...player2];
console.log(allPlayers);

// 4. Adding new subtitute players to Team 1
console.log('------------------------ 4 ------------------------');
const newPlayers1 = ['Thiago', 'Coutinho', 'Perisic'];

const players1Final = [...player1, ...newPlayers1];
console.log(players1Final);

// 5. Creating new variables for the game.odds
console.log('------------------------ 5 ------------------------');
// const { team1, x: draw, team2 } = game.odds;

const {
  odds: { team1, x: draw, team2 },
} = game;

console.log(team1);
console.log(draw);
console.log(team2);

// 6. Functions that receives arbitrary number of Player and, prints each of them to the console, along with the number of goals that were scored in total (number of player names passed in)
console.log('------------------------ 6 ------------------------');
const printGoals = function (...players) {
  console.log(players);
  console.log(players.length);

  let funcPlayers = '';
  for (let i = 0; i < players.length; i++) {
    funcPlayers += players[i] + ', ';
  }
  console.log(
    `These are the players: ${funcPlayers}and their score is: ${players.length}.`
  );
};

const testPlayers = [
  'Davies',
  'Muller',
  'Lewandowski',
  'Kimmich',
  'Umer',
  'Jonas',
];

printGoals(...game.scored);
printGoals(...testPlayers);
printGoals('Davies', 'Muller');

// 7. Without using the terniary operator and if/else statement, print to the console which team is going to win

// with using if / else statment

// if (team1 < team2) {
//   console.log('Team 1 wins');
// } else if (team2 < team1) {
//   console.log('Team 2 wins');
// } else {
//   console.log('Match is draw');
// }
console.log('------------------------ 7 ------------------------');
team1 < team2 && console.log('Team 1 wins');
team2 < team1 && console.log('Team 2 wins');
team1 === team2 && console.log('Draw happens');
*/

//////////////////////////////////////////////////////
//////////////////////////////////////////////////////
//////////////////////////////////////////////////////
// CODING CHALLENGE #2
/*

Let's continue with our football betting app! Keep using the 'game' variable from
before.
Your tasks:
1. Loop over the game.scored array and print each player name to the console,
along with the goal number (Example: "Goal 1: Lewandowski")
2. Use a loop to calculate the average odd and log it to the console (We already
studied how to calculate averages, you can go check if you don't remember)
3. Print the 3 odds to the console, but in a nice formatted way, exactly like this:
Odd of victory Bayern Munich: 1.33
Odd of draw: 3.25
Odd of victory Borrussia Dortmund: 6.5
Get the team names directly from the game object, don't hardcode them
(except for "draw"). Hint: Note how the odds and the game objects have the
same property names �
4. Bonus: Create an object called 'scorers' which contains the names of the
players who scored as properties, and the number of goals as the value. In this
game, it will look like this:
{
 Gnarby: 1,
 Hummels: 1,
 Lewandowski: 2
}
GOOD LUCK �


const game = {
  team1: 'Bayern Munich',
  team2: 'Borrussia Dortmund',
  players: [
    [
      'Neuer',
      'Pavard',
      'Martinez',
      'Alaba',
      'Davies',
      'Kimmich',
      'Goretzka',
      'Coman',
      'Muller',
      'Gnarby',
      'Lewandowski',
    ],
    [
      'Burki',
      'Schulz',
      'Hummels',
      'Akanji',
      'Hakimi',
      'Weigl',
      'Witsel',
      'Hazard',
      'Brandt',
      'Sancho',
      'Gotze',
    ],
  ],
  score: '4:0',
  scored: ['Lewandowski', 'Gnarby', 'Lewandowski', 'Hummels'],
  date: 'Nov 9th, 2037',
  odds: {
    team1: 1.33,
    x: 3.25,
    team2: 6.5,
  },
};

// SOLUTION
// 1.  Loop over the game.scored array and print each player name to the console, along with the goal number (Example: "Goal 1: Lewandowski")
// console.log('------------- 1 -------------');
// for (const loopScored of game.scored) {
//   console.log(`Goal ${game.scored.indexOf(loopScored) + 1}: ${loopScored}`);
// }

console.log('------------- AGAIN:1 -------------');
for (const [i, player] of game.scored.entries())
  console.log(`Goal ${i + 1}: ${player}`);

// 2. Use a loop to calculate the average odd and log it to the console (We already studied how to calculate averages, you can go check if you don't remember)

// console.log(Object.keys(game.odds));

console.log('------------- 2 -------------');
const oddsValues = Object.values(game.odds);

let average = 0;
for (const odd of oddsValues) average += odd;
average /= oddsValues.length;
console.log(average);

// 3. Print the 3 odds to the console, but in a nice formatted way, exactly like this: Odd of victory Bayern Munich: 1.33 Odd of draw: 3.25 Odd of victory Borrussia Dortmund: 6.5 Get the team names directly from the game object, don't hardcode them (except for "draw"). Hint: Note how the odds and the game objects have the same property names

console.log('------------- 3 -------------');
const oddsEntries = Object.values(game.odds);
const gameEntries = Object.values(game);
console.log(oddsEntries);
console.log(gameEntries);

console.log(
  `Odd of ${gameEntries[0]}: ${oddsEntries[1]}\nOdd of Draw: ${oddsEntries[1]}\nOdd of ${gameEntries[1]}: ${oddsEntries[2]}`
);

console.log('------------- AGAIN: 3 -------------');
for (const [team, odd] of Object.entries(game.odds)) {
  const teamStr = team === 'x' ? 'draw' : `Victory ${game[team]}`;
  console.log(`Odd of ${teamStr}: ${odd}`);
}

/* 
4. Bonus: Create an object called 'scorers' which contains the names of the players who scored as properties, and the number of goals as the value. In this game, it will look like this:
{
  Gnarby: 1,
  Hummels: 1,
  Lewandowski: 2
}
console.log('------------- 4 -------------');

const scorer = {};
for (const player of game.scored) {
  scorer[player] ? scorer[player]++ : (scorer[player] = 1);
}

console.log(scorer);
*/

///////////////////////////////////////////////////////////
///////////////////////////////////////////////////////////
///////////////////////////////////////////////////////////
// CODING CHALLENGE #3
/*
Let's continue with our football betting app! This time, we have a map called 'gameEvents' (see below) with a log of the events that happened during the game. The values are the events themselves, and the keys are the minutes in which each event happened (a football game has 90 minutes plus some extra time).
Your tasks:
1. Create an array 'events' of the different game events that happened (no
duplicates)
2. After the game has finished, is was found that the yellow card from minute 64 was unfair. So remove this event from the game events log.
3. Compute and log the following string to the console: "An event happened, on average, every 9 minutes" (keep in mind that a game has 90 minutes)
4. Loop over 'gameEvents' and log each element to the console, marking whether it's in the first half or second half (after 45 min) of the game, like this: 
[FIRST HALF] 17: ⚽ GOAL
GOOD LUCK */
/*
const gameEvents = new Map([
  [17, '⚽ GOAL'],
  [36, '🔗 Substitution'],
  [47, '⚽ GOAL'],
  [61, '🔗 Substitution'],
  [64, '🟨 Yellow card'],
  [69, '🔴 Red card'],
  [70, '🔗 Substitution'],
  [72, '🔗 Substitution'],
  [76, '⚽ GOAL'],
  [80, '⚽ GOAL'],
  [92, '🟨 Yellow card'],
]);

// SOLUTION
// 1.

const arrGameEvents = [...new Set(gameEvents.values())];
console.log(arrGameEvents);

// 2.
gameEvents.delete(64);
// console.log(gameEvents);

// 3.
console.log(gameEvents.size);

console.log(
  `An event happened, on average, in every ${90 / gameEvents.size} minutes`
);

// 4.
for (const [key, value] of gameEvents.entries()) {
  if (key <= 45) {
    console.log(`[First Half] ${key}: ${value}`);
  } else if (key <= 90) {
    console.log(`[Second Half] ${key}: ${value}`);
  } else if (key > 90) {
    console.log(`[Extra Time] ${key}: ${value}`);
  }
}
*/
