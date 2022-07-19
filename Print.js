//  Write a JavaScript program to print the contents of the current window
const root= document.querySelector(".root");
const div = document.createElement("div");
div.innerHTML=`<p>Click the button to print the current page.</p> 
<button onclick="print_current_page()">Print this page</button>`
root.appendChild(div);
const print_current_page=()=>{
    window.print();
}