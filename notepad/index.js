
let btn = document.querySelector(".btn");
let container = document.querySelector(".container");


btn.addEventListener("click", ()=>{
  const div= document.createElement("div");
  div.innerHTML=`
  
<div id="text-input" contenteditable="true" data-text="Type here..."></div>`
container.appendChild(div);
})
let optionsButtons = document.querySelectorAll(".option-button");







//Initial Settings

const modifyText = (command, defaultUi, value) => {
  //execCommand executes command on selected text
  document.execCommand(command, defaultUi, value);
};
//For basic operations which don't need value parameter
optionsButtons.forEach((button) => {
  button.addEventListener("click", () => {
    modifyText(button.id, false, null);
   
  });
});


