// IMPORTING MODULE
// all the importing statements are hoisted to the top
// prettier-ignore
// import { addToCart, myName, totalPrice as price, quantity } from './shoppingCart.js';
// addToCart('headsets', 3);
// myName('umer');
// console.log(quantity, price);

console.log('Importing module');

// import * as ShoppingCart from './shoppingCart.js';
// ShoppingCart.addToCart('breads', 23);

// importing the default cart
// import add, {
//   addToCart,
//   myName,
//   totalPrice as price,
//   quantity,
// } from './shoppingCart.js';

import add, { cart } from './shoppingCart.js';
add('biryani', 2);
add('bread', 5);
add('apples', 4);

console.log(cart);

/*
//////////////////////////////////////////
//////////////////////////////////////////
// MODULE PATTERN
// it all happening because of the closures
const shoppingCart2 = (function () {
  const cart = [];
  const shippingCost = 10;
  const totalPrice = 237;
  const totalQuantity = 23;

  const addToCart = function (product, quantity) {
    cart.push({ product, quantity });
    console.log(
      `${quantity} ${product} are added to the cart (Shipping cost is ${shippingCost})`
    );
  };

  const orderStock = function (product, quantity) {
    console.log(`${quantity} ${product} ordered from supplier`);
  };

  return {
    addToCart,
    cart,
    totalPrice,
    totalQuantity,
  };
})();

shoppingCart2.addToCart('pizza', 2);
console.log(shoppingCart2);
console.log(shoppingCart2.shoppingCost);

// Export in node.js
export.addToCart = function (product, quantity) {
  cart.push({ product, quantity });
  console.log(
    `${quantity} ${product} are added to the cart (Shipping cost is ${shippingCost})`
  );
};

// Import in node.js
const { addToCart } = require('./shoppingCart.js')
*/

// import cloneDeep from './node_modules/lodash-es/cloneDeep.js';
import cloneDeep from 'lodash-es';
// import cloneDeep from 'lodash';

console.log(cloneDeep({ name: 'umer', age: 19 }));

const state = {
  cart: [
    {
      product: 'bread',
      quantity: 5,
    },

    {
      product: 'pizza',
      quantity: 2,
    },
  ],

  user: { loggedIn: true },
};

const stateClone = Object.assign({}, state);
console.log(stateClone);
const stateDeepClone = cloneDeep(state);
console.log(stateDeepClone);
state.user.loggedIn = false;

if (module.hot) {
  module.hot.accept();
}

class Person {
  #greeting = 'Hey';
  constructor(name) {
    this.name = name;
    console.log(`${this.#greeting} ${this.name}`);
  }
}

const jonas = new Person('jonas');
console.log('jonas' ?? null);

console.log(cart.find(el => el.quantity >= 2));
Promise.resolve('TEST').then(x => console.log(x));

import 'core-js/stable';
// import 'core-js/stable/array/find';
// import 'core-js/stable/promise';

// polifylling the async functions
import 'regenerator-runtime/runtime';
