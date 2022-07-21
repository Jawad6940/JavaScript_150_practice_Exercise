const container = document.querySelector(".container")
 const SQUARE=800;
 const colors = ['#e74c3c', '#8e44ad', '#3498db', '#e67e22', '#2ecc71']

 for(let i=0;i<800; i++){
    const div=document.createElement("div")
    div.classList.add("square")
    div.addEventListener("mouseover" , ()=>{
        setColcor(div);
    })
    div.addEventListener("mouseout" , ()=>{
        colorRemove(div);
    })
    container.appendChild(div);
   
 }
 const setColcor=(div)=>{
    const color=colors[randomClr()]
    
    div.style.background=color;
    div.style.boxShadow = `0 0 2px ${color}, 0 0 10px ${color}`
}
 const randomClr=()=>(Math.floor(Math.random()*colors.length));
const colorRemove = (div)=>{
    div.style.background="#1d1d1d";
    div.style.boxShadow = `0 0 2px #000`
}