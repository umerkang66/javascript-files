'use strict';

///////////////////////////////////////
///////////////////////////////////////
// Constructor Functions and the new Operator
const Person = function (firstName, birthYear) {
  // Instance properties
  this.firstName = firstName;
  this.birthYear = birthYear;

  // never created a method inside the contructor function
  //   this.calcAge = function () {
  //     console.log(2037 - this.birthYear);
  //   };
};

const jonas = new Person('Jonas', 1991);
console.log(jonas);

// 1. New {} is created
// 2. function is called, this = {}
// 3. {} linked to prototype
// 4. function automatically return {}

const matilda = new Person('Matilda', 2017);
const jack = new Person('Jack', 1975);
console.log(matilda, jack);

console.log(jonas instanceof Person);

Person.hey = function () {
  console.log('Hey there! How are you? 🙋‍♂️');
  console.log(this);
};

Person.hey();

///////////////////////////////////////
///////////////////////////////////////
// PROTOTYPES
console.log(Person.prototype);

Person.prototype.calcAge = function () {
  console.log(2037 - this.birthYear);
};

// the this keyword is apply to whom who will call the method on the prototype
jonas.calcAge();
matilda.calcAge();
// jonas, matilda, and jack objects are somehow connected to the Person

console.log(jonas.__proto__);
console.log(jonas.__proto__ === Person.prototype);

// Person.prototype is not prototype of Person, instead it will used by the objects that will be created by Person constructor function

console.log(Person.prototype.isPrototypeOf(jonas));
console.log(Person.prototype.isPrototypeOf(matilda));
console.log(Person.prototype.isPrototypeOf(jack));
console.log(Person.prototype.isPrototypeOf(Person));

// step no. 3 of new creates the __proto__ property

Person.prototype.species = 'Homo Sapiens';
console.log(jonas.species, matilda.species, jack.species);

// species is not owned property, owned properties are the ones that clearly defined on the objects.

console.log(jonas.hasOwnProperty('firstName'));
console.log(jonas.hasOwnProperty('species'));
console.log(jonas.hasOwnProperty('birthYear'));

///////////////////////////////////////
///////////////////////////////////////
// PROTOTYPAL INHERITANCE ON BUILT-IN-JAVASCRIPT

console.log(jonas.__proto__);
// Object.prototype: that is the top of prototype chain
console.log(jonas.__proto__.__proto__);
console.log(jonas.__proto__.__proto__.__proto__);

console.dir(Person.prototype.constructor);

const arr = [2, 4, 2, 3, 3, 5, 5, 3, 5, 6, 7]; // new Array === []
console.log(arr.__proto__);
console.log(arr.__proto__.__proto__);

Array.prototype.unique = function () {
  return [...new Set(this)];
};

console.log(arr.unique());

const h1 = document.querySelector('h1');
console.dir(x => x + 1);

///////////////////////////////////////
///////////////////////////////////////
// CODING CHALLENGE #1
const CarObj = function (make, speed) {
  this.make = make;
  this.speed = speed;
};

CarObj.prototype.accelerate = function () {
  this.speed += 10;
  console.log(`${this.make} is going at ${this.speed}`);
};

CarObj.prototype.brake = function () {
  this.speed -= 5;
  console.log(`${this.make} is going at ${this.speed}`);
};

const bmw = new CarObj('BMW', 120);
const mercedes = new CarObj('Mercedes', 95);

bmw.accelerate();
bmw.brake();
mercedes.accelerate();
mercedes.brake();
// everything in JavaScript except primitives are objects

// ES6 CLASSES
// it doesn't work as in other languages like in java, c++, classes are just special type of functions behind the scenes.

// Class expression
// const PersonClExp = class {};

// Class declaration
class PersonCl {
  constructor(fullName, birthYear) {
    this.fullName = fullName;
    this.birthYear = birthYear;
  }

  // methods will be added to the .prototype property i.e. instance methods
  calcAge() {
    return 2037 - this.birthYear;
  }

  greet() {
    console.log(`Hey ${this.fullName}, your age is ${this.calcAge()}`);
  }

  // getter in class
  // it kind of added as a property
  get age() {
    return 2037 - this.birthYear;
  }

  // try to set property that already exist
  // setter in class
  set fullName(name) {
    if (name.includes(' ')) this._fullName = name;
    else alert(`${name} is not a full name`);
  }

  get fullName() {
    return this._fullName;
  }

  // STATIC METHOD
  static hey() {
    console.log('Hey there! How are you? 🙋‍♂️');
    console.log(this);
  }
}
// the functions will be on the prototype not on the objects, just the like the prototypal inheritance

const jessica = new PersonCl('Jessica Davis', 1996);
console.log(jessica.calcAge());
console.log(jessica.age);
console.log(jessica);

console.log(jessica.__proto__ === PersonCl.prototype);
jessica.greet();

const walter = new PersonCl('Walter White', 1993);
console.log(walter);

PersonCl.hey();

// 1. Classes are not hoisted, even class declaration or class expression
// 2. Classes are also first-Class citizens
// 3. Classes are executed in 'strict' mode

///////////////////////////////////////
///////////////////////////////////////
// GETTERS AND SETTERS
// these both are functions that get and set values as the name says

const account = {
  owner: 'Jonas',
  movements: [200, 345, 234, 400],

  get latest() {
    return this.movements.slice(-1).pop();
  },

  set latest(mov) {
    this.movements.push(mov);
  },
};

console.log(account.latest);
account.latest = 50;
// we dont call it we write it as it was just a property

console.log(account.movements);

///////////////////////////////////////
///////////////////////////////////////
// OBJECT.CREATE
// there is not constructor function, no new operator
const PersonProto = {
  calcAge() {
    console.log(2037 - this.birthYear);
  },

  // this is nothing to do with constructor function because we are not using the new operator. this is just the manual way of initializing the object
  init(firstName, birthYear) {
    this.firstName = firstName;
    this.birthYear = birthYear;
  },
};

const stevenOjb = Object.create(PersonProto);
stevenOjb.name = 'StevenOjb Williams';
stevenOjb.birthYear = 2002;

stevenOjb.calcAge();

console.log(stevenOjb.__proto__ === PersonProto);

const sarah = Object.create(PersonProto);
sarah.init('Sarah Williams', 2002);
console.log(sarah);
sarah.calcAge();

// when we will create the new class inheritance then we will use Object.create

///////////////////////////////////////
///////////////////////////////////////
// CODING CHALLENGE #2

class CarClObj {
  constructor(make, speed) {
    this.make = make;
    this.speed = speed;
  }

  accelerate() {
    this.speed += 10;
    console.log(this.speed);
  }

  brake() {
    this.speed -= 5;
    console.log(this.speed);
  }

  // getter that convert the speed into mi/h from ki/h
  get speedUS() {
    this.speed /= 1.6;
    console.log(this.speed);
  }

  set speedUS(speed) {
    this.speed = speed * 1.6;
    console.log(this.speed);
  }
}

const ford = new CarClObj('Ford', 120);
ford.accelerate();
ford.brake();
ford.speedUS;

ford.speedUS = 120;

///////////////////////////////////////
///////////////////////////////////////
// INHERITANCE between "Classes": CONSTRUCTOR FUNCTIONS
// as a person
const PersonObj = function (firstName, birthYear) {
  this.firstName = firstName;
  this.birthYear = birthYear;
};

PersonObj.prototype.calcAge = function () {
  console.log(2037 - this.birthYear);
};

// as a student
const Student = function (firstName, birthYear, course) {
  PersonObj.call(this, firstName, birthYear);
  this.course = course;
};

// linking the PersonObj .prototype with Student .prototype
Student.prototype = Object.create(PersonObj.prototype);
Student.prototype.constructor = Student;

Student.prototype.introduce = function () {
  console.log(`My name is ${this.firstName}, and I study ${this.course}`);
};

const mike = new Student('Mike', 2020, 'Computer Science');
mike.introduce();
mike.calcAge();

console.log(mike instanceof Student);
console.log(mike instanceof PersonObj);
console.log(mike.__proto__);

console.dir(Student.prototype.constructor);

///////////////////////////////////////
///////////////////////////////////////
// CODING CHALLENGE #3
// Previous car
const Car = function (make, speed) {
  this.make = make;
  this.speed = speed;
};

Car.prototype.accelerate = function () {
  this.speed += 10;
  console.log(`${this.make} is going at ${this.speed}`);
};

Car.prototype.brake = function () {
  this.speed -= 5;
  console.log(`${this.make} is going at ${this.speed}`);
};

// new car (Electric Vihicle)
const EV = function (make, speed, charge) {
  Car.call(this, make, speed);
  this.charge = charge;
};

// connecting the prototype of car with prototype of Ev
EV.prototype = Object.create(Car.prototype);

EV.prototype.chargeBattery = function (chargeTo) {
  this.charge = chargeTo;
};

EV.prototype.accelerate = function () {
  this.speed += 20;
  this.charge--;

  console.log(
    `${this.make} going at ${this.speed} km/h, with the charge of ${this.charge}%`
  );
};

const tesla = new EV('Tesla', 120, 23);
tesla.chargeBattery(90);
tesla.accelerate();

// i know what happened due to the polymorphism the

///////////////////////////////////////
///////////////////////////////////////
// INHERITANCE BETWEEN CLASSES ES6 CLASSES
class PersonClInheritance {
  constructor(fullName, birthYear) {
    this.fullName = fullName;
    this.birthYear = birthYear;
  }

  // methods will be added to the .prototype property i.e. instance methods
  calcAge() {
    console.log(2037 - this.birthYear);
  }

  greet() {
    console.log(`Hey ${this.fullName}, your age is ${this.calcAge()}`);
  }

  // getter in class
  // it kind of added as a property
  get age() {
    return 2037 - this.birthYear;
  }

  // try to set property that already exist
  // setter in class
  set fullName(name) {
    if (name.includes(' ')) this._fullName = name;
    else alert(`${name} is not a full name`);
  }

  get fullName() {
    return this._fullName;
  }

  // STATIC METHOD
  static hey() {
    console.log('Hey there! How are you? 🙋‍♂️');
    console.log(this);
  }
}

// creating the child class Student that will inherit from Person class
// to implement inheritance of prototypes we need to use entends and super function
class StudentCl extends PersonClInheritance {
  constructor(fullName, birthYear, course) {
    // this super function is always need to happen first
    super(fullName, birthYear);
    this.course = course;
  }

  introduce() {
    console.log(`My name is ${this.fullName}, and I study ${this.course}`);
  }

  calcAge() {
    console.log(
      `I am ${
        2037 - this.birthYear
      } years old, but as I am a student I feel like I am ${
        2037 - this.birthYear + 10
      } years old`
    );
    // this calcAge method here is shadowing the one that is in the parent class
  }
}

const martha = new StudentCl('Martha Jonas', 2012, 'Computer Science');
martha.introduce();
martha.calcAge();

///////////////////////////////////////
///////////////////////////////////////
// INHERITANCE BETWEEN CLASSES "Object.create()"
const PersonProtoByCreate = {
  calcAge() {
    console.log(2037 - this.birthYear);
  },

  init(firstName, birthYear) {
    this.firstName = firstName;
    this.birthYear = birthYear;
  },
};

const stevenObjByCreate = Object.create(PersonProtoByCreate);

const StudentProto = Object.create(PersonProtoByCreate);
StudentProto.init = function (firstName, birthYear, course) {
  PersonProtoByCreate.init.call(this, firstName, birthYear);
  this.course = course;
};

StudentProto.introduce = function () {
  console.log(`My name is ${this.firstName}, and I study ${this.course}`);
};

// now creating jay from StudentProto that will have properties and functions fo PersonProtoByCreate prototype
const jay = Object.create(StudentProto);
jay.init('Jay', 2012, 'JavaScript');
jay.introduce();
jay.calcAge();

///////////////////////////////////////
///////////////////////////////////////
// ANOTHER CLASS EXAMPLE
// ENCAPSULATION

// a field is a property that will be available on all instances
// 1) PUBLIC FIELDS
// 2) PRIVATE FIELDS
// 3) PUBLIC METHODS
// 4) PRIVATE METHODS
// there are also static versions

class Account {
  // 1) public field
  // these fields are not on the prototype, instead they are on the instances
  locale = navigator.language;

  // 2) private fields: on the instances themselves not the prototype
  #movements = [];
  #pin;

  constructor(owner, currency, pin) {
    this.owner = owner;
    this.currency = currency;

    // Protected Property
    this.#pin = pin;
    // this._movements = [];
    // this.locale = navigator.language;
  }

  // PUBLIC INTERFACE OF OBJECTS
  // 3) PUBLIC METHODS
  // all these methods are added on the prototype
  getMovements() {
    return this.#movements;
  }

  deposit(val) {
    this.#movements.push(val);
    return this;
  }

  widthdraw(val) {
    this.deposit(-val);
    return this;
  }

  requestLoan(val) {
    if (this._approveLoan(val)) {
      this.deposit(val);
      console.log(`Loan of ${val} is approved`);
      return this;
    }
  }

  // this will be available only on the class not on the instances
  static helper() {
    console.log('this is static method on the class');
  }

  // 4) PRIVATE METHODS
  // #approveLoan(val) {
  _approveLoan(val) {
    return true;
  }
}

const acc1 = new Account('Jonas', 'EUR', 1111);
acc1.deposit(250);
acc1.widthdraw(140);
acc1.requestLoan(1000);
console.log(acc1.getMovements());

///////////////////////////////////////
///////////////////////////////////////
// CHAINING METHODS IN CLASSES

acc1.deposit(300).deposit(500).widthdraw(35).requestLoan(25000).widthdraw(4000);
console.log(acc1.getMovements());

///////////////////////////////////////
///////////////////////////////////////
// CODING CHALLENGE #3
class Obj {
  constructor(make, speed) {
    this.make = make;
    this.speed = speed;
  }

  accelerate() {
    this.speed += 10;
    return this;
  }

  brake() {
    this.speed -= 5;
    return this;
  }

  // getter that convert the speed into mi/h from ki/h
  // get speedUS() {
  //   this.speed /= 1.6;
  //   console.log(this.speed);
  // }

  // set speedUS(speed) {
  //   this.speed = speed * 1.6;
  //   console.log(this.speed);
  // }
}

// new car (Electric Vihicle)

class EVCl extends Obj {
  // Private field
  #charge;

  constructor(make, speed, charge) {
    super(make, speed);
    this.#charge = charge;
  }

  chargeBattery(val) {
    this.#charge = val;
    return this;
  }
}

const rivian = new EVCl('Rivian', 120, 23);
rivian.accelerate().brake().chargeBattery(90);
console.log(rivian);
