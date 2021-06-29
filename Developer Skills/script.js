// Remember, we're gonna use strict mode in all scripts now!
'use strict';

// const x = 23;
// if (x === 23) {
//   console.log("You are good to go man");
// }

// const calcAge = birthYear => 2037 - birthYear;

// console.log(calcAge(1991));

// CODING CHALLENGE #1
// We work for a company building a smart home thermometer. Our most recent task is this: "Given and array of temperature of one day, calculate the temperature amplitude. Keep in mind that sometimes there might be a sensor error."

// const temperature = [3, -2, -6, -1, 'error', 9, 13, 17, 15, 15, 9, 5];

// Understading the problem
// ~ what is temperature amplitude? Answer: difference between highest and lowest temp.
// ~ How to compute the max and min temperatures?
// ~ What does a sensor look like? and What to do?

// Breaking up into sub-problems
// ~ How to ignore errors?
// ~ Find Max value in temperature array?
// ~ Find Min value in temperature array?
// ~ Subtract MIN from MAX and return it.

// const calcTempAmplitude = function (temps) {
//   let max = temps[0];
//   let min = temps[0];

//   for (let i = 0; i < temps.length; i++) {
//     const curTemp = temps[i];
//     if (typeof curTemp !== 'number') continue;

//     if (curTemp > max) {
//       max = curTemp;
//     }
//     if (curTemp < min) {
//       min = curTemp;
//     }
//   }

//   return max - min;
// };

// console.log(calcTempAmplitude(temperature));

// // PROBLEM #2
// // Function should now receive two arrays of temperature.

// // 1) Understading the problem
// // ~ With 2 arrays, should we implement functionality twice? NO! Just the merge the two arrays at the beginning

// // 2) Breking the sub-problems
// // ~ How to merge two arrays

// const calcTempAmplitude2 = function (t1, t2) {
//   const temps = t1.concat(t2);
//   console.log(temps);

//   let max = temps[0];
//   let min = temps[0];

//   for (let i = 0; i < temps.length; i++) {
//     const curTemp = temps[i];
//     if (typeof curTemp !== 'number') continue;

//     if (curTemp > max) {
//       max = curTemp;
//     }
//     if (curTemp < min) {
//       min = curTemp;
//     }
//   }
//   return max - min;
// };

// console.log(calcTempAmplitude2([3, 5, 1], [9, 0, 5]));

// DEBUGING THE CODE

// const measureKelvin = function () {
//   const measurement = {
//     type: 'temp',
//     unit: 'celsius',

//     // FIX THE BUG
//     // value: Number(prompt('Degrees celcius: ')),
//     value: 10,
//   };

// 2) FIND THE BUG
//   console.table(measurement);

//   //   console.log(measurement.value, typeof measurement.value);

//   const kelvin = measurement.value + 273;
//   return kelvin;
// };

// // 1) IDENTIFY THE BUG
// console.log(measureKelvin());

// // USING A DEBUGGER
// const calcTempAmplitudeBug = function (t1, t2) {
//   const temps = t1.concat(t2);
//   console.log(temps);

//   let max = temps[0];
//   let min = temps[0];

//   for (let i = 0; i < temps.length; i++) {
//     const curTemp = temps[i];
//     if (typeof curTemp !== 'number') continue;

//     if (curTemp > max) {
//       max = curTemp;
//     }
//     if (curTemp < min) {
//       min = curTemp;
//     }
//   }

//   console.log(max, min);
//   return max - min;
// };

// const amplitudeBug = calcTempAmplitudeBug([3, 5, 1], [9, 4, 5]);
// // 1) IDENTIFY THE BUG
// console.log(amplitudeBug);

///////////////////////////////////////////////
///////////////////////////////////////////////

// CODING CHALLENGE #1

/* Given an array of forecasted maximum temperatures, the thermometer displays a
string with the given temperatures. Example: [17, 21, 23] will print "... 17ºC in 1
days ... 21ºC in 2 days ... 23ºC in 3 days ..."

Your tasks:

1. Create a function 'printForecast' which takes in an array 'arr' and logs a string like the above to the console. Try it with both test datasets.

2. Use the problem-solving framework: Understand the problem and break it up into sub-problems!

Test data:

§ Data 1: [17, 21, 23]
§ Data 2: [12, 5, -5, 0, 4]

GOOD LUCK � 
*/

// 1) WHAT ARE THE PROBLEMS
// ~ Array transformed to string, and separated by string.
// ~ What is X of the arrays? Answer: index + 1;

// 2) WHAT ARE THE SUB PROBLEMS
// ~ Transform array to the string
// ~ Tranform each element of the string with C
// ~ Strings need to contain day: index + 1
// ~ Add ... between the element at start and the end of the element

// const printForecast = function (arr) {
//   let str = '';
//   for (let i = 0; i < arr.length; i++) {
//     str += `${arr[i]} C in ${i + 1} days ...  `;
//   }

//   console.log('...' + str);
// };

// printForecast([17, 21, 23, 34, 23, 22]);

// const printForecast2 = function (arr) {
//   let array = arr[0];
//   for (let i = 0; i < arr.length; i++) {
//     array = arr[i];
//   }

//   console.log(array);
// };

// printForecast2([17, 21, 23, 34, 23, 22]);

