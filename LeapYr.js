// Write a JavaScript program to determine whether a given year is a leap year in the Gregorian calendar.

let yy= parseInt(prompt("Enter year yyyy: ", "2022"));
if(yy%4==0&&(yy%400==0||yy%100!=0)){
    console.log(`${yy} is leap yy`);
}
else{
    console.log(`${yy} is not leap yy`);

}