// Write a JavaScript program to find the area of a triangle where lengths of the three of its sides are 5, 6, 7.
let a = parseInt(prompt("side 1")) ;
let b = parseInt(prompt("side 2"))
let c = parseInt(prompt("side 3"))

let sum = (a+b+c)/2;
// console.log(sum);
let area= Math.sqrt(sum*((sum-a)*(sum-b)*(sum-c)))
console.log(area);