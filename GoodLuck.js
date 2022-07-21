// Write a JavaScript program where the program takes a random integer between 1 to 10, the user is then prompted to input a guess number.
//  If the user input matches with guess number, the program will display a message "Good Work" otherwise display a message "Not matched".
function getRandom(){
    let num= Math.floor(Math.random()*((10-1)+1)+1);
    return(num)
}
let userInp= parseInt(prompt("Enter a number between 1 and 10"));

const root= document.querySelector(".root");
const div = document.createElement("div");
div.innerHTML=`<p id="num"></p>`
root.appendChild(div);

const num= document.getElementById("num");
compInp=getRandom();
if(userInp==(compInp)){
    num.textContent=("Good luck ")
}
else{
    num.textContent=(`Not matched your input ${userInp} and computer input is   ${compInp} `)
}
filename = "system.php"
console.log(filename.split('.').shift());