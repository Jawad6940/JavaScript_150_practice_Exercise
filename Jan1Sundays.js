// Write a JavaScript program to find 1st January is being a Sunday between 2014 and 2050.
const root= document.querySelector(".root");
const div = document.createElement("div");
div.innerHTML=`<p id="yy"></p>`
root.appendChild(div);
let yy= document.getElementById("yy");
 for(let year=2014; year<2051;year++){
    let currentYr= new Date(year,0,1);
    let day= currentYr.getDay();
    if(day==0){
       
       yy.innerHTML+=`<h1>January ${year} is sunday</h1>`;
    }
}