// EXPORTING MODULE
console.log('Exporting module');

// variables are only sculpt to only this module
const shippingCost = 10;
export const cart = [];

console.log(shippingCost);

// exports only work in the top level code
export const addToCart = function (product, quantity) {
  cart.push({ product, quantity });
  console.log(`${quantity} ${product} are added to the cart`);
};

export const myName = function (name) {
  console.log(name);
};

const totalPrice = 343;
const totalQuantity = 23;

export { totalPrice, totalQuantity as quantity };

// export as default, it only exports one value per module
export default function (product, quantity) {
  cart.push({ product, quantity });
  console.log(`${quantity} ${product} are added to the cart`);
}
