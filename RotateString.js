// Write a JavaScript program to rotate the string 'yourname' in right direction by periodically removing one letter from the end of the string and attaching it to the front.

const root= document.querySelector(".root");
const div = document.createElement("div");
const text=prompt("Eneter rotate content", "Rotate")
div.innerHTML=`<h1 id="rot" style="text-align:center">${text}</h1>`
root.appendChild(div);

function rotate(){
    console.log("called");
    const rot= document.getElementById("rot");
    let text=rot.textContent;
    
    setInterval(()=>{
        text= text[text.length-1]+text.substring(0,text.length-1)
        rot.textContent=text;
    },1000)
   
}
rotate()

