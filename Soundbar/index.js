const btn = document.querySelectorAll(".btn");
const stop = document.querySelector(".stop");

//  const playSound =( )=> {
    // console.log("play");
   
    btn.forEach((btn)=>{
        console.log("active");
        btn.addEventListener("click",()=>{
            stopSound();
        
           document.getElementById(btn.textContent).play()
        }  )

    })
   
   
//  }
 
// playSound();


function stopSound(){
    btn.forEach((btn)=>{
       
    //   console.log("clicked");
           const sound = document.getElementById(btn.textContent)
           sound.pause();
           sound.currentTime=0;

      

    })
}
stop.addEventListener("click",stopSound)
