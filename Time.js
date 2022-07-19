// Write a JavaScript program to display the current day,date and time in the following format.  Go to the editor
// Sample Output : Today is : Tuesday.
// Current time is : 10 PM : 30 min : 38 sec
// Current date: mm-dd-yyyy, mm/dd/yyyy or dd-mm-yyyy, dd/mm/yyyy

// create a date object
let todayDate = new Date();
console.log(todayDate);
const day=todayDate.getDay();
// it gives a number reference to daylist array

const dayList=["Sunday","Monday","Tuesday","Wednesday ","Thursday","Friday","Saturday"];
console.log(`Today is : ${dayList[day]}`);

// task two
let hour=todayDate.getHours()
let min=todayDate.getMinutes()
let sec=todayDate.getSeconds()
console.log(hour);
//we have to convert 24 clock into 12 O clock and add PM or AM
// hour=13;
let prepand= hour>=12? "PM":"AM";

console.log(prepand);
hour=hour>12? hour-12:hour;
if(prepand=="AM" && hour==0 ){
    hour=12;    
}
console.log(`Current time is : ${hour}${prepand} : ${min} min : ${sec} sec`);

// task 3
let dd=todayDate.getDate();
// The getMonth() method returns the month in the specified date according to local time, 
// as a zero-based value (where zero indicates the first month of the year). The value returned 
// by getMonth() is an integer between 0 and 11. 0 corresponds to January, 1 to February, and so on.
let mm=todayDate.getMonth()+1;
let yy= todayDate.getFullYear();
console.log(`Current date: ${dd}-${mm}-${yy}`);