//variable
let canvas, ctx, CANVAS_WIDTH, CANVAS_HEIGHT,tilesArray,singleTileWidth;

let AlphaKeys = ["A", "S", "D", "F"];
let keysArray = [65, 83, 68, 70];
//game start
function start() {
  canvas = document.getElementById("game");
  ctx = canvas.getContext("2d");
  ctx.textAlign = "center";
  
  canvas.width = $(window).width() / 3;
  canvas.height = $(window).height() - 100;
  CANVAS_WIDTH = canvas.width;
  CANVAS_HEIGHT = canvas.height;
  singleTileWidth=CANVAS_WIDTH/4;
  ctx.fillStyle = 0000;
  //tile creating
  tilesArray=[];
  for (let i = 0; i < 4; i++) {
    let randomIndex= Math.floor(Math.random() * 4);
    tilesArray.push([randomIndex,CANVAS_WIDTH-((randomIndex * CANVAS_WIDTH) / 4)])
    
  }
 
  //color filling
  for (let i = 0; i < 4; i++) {
    blacktile.draw(tilesArray[i][0], i);
    
  }
  
  drawlines();
  //keypress
document.addEventListener("keydown",keyboardControl)
//mouse press
canvas.addEventListener("mousedown", mouseControl);
}

//black tile creation
let blacktile = {
  color: "black",
  x: 0,
  y: 0,
  draw: function (width, height) {
    ctx.fillStyle = this.color;
    ctx.fillRect(
        width * (CANVAS_WIDTH / 4),
        height * (CANVAS_HEIGHT / 4),
      CANVAS_WIDTH / 4,
      CANVAS_HEIGHT / 4
    );
    ctx.fillStyle = "#fff";
    ctx.font = "700 30px 'sans-serif";
    ctx.fillText(
      AlphaKeys[width],
      width * (CANVAS_WIDTH / 4) + 47,
      height * (CANVAS_HEIGHT / 4) + 85
    );
  },
 
};

//border
function drawlines() {
  ctx.beginPath();
  for (let i = 0; i < 5; i++) {
    ctx.moveTo((i * CANVAS_WIDTH) / 4, 0);
    ctx.lineTo((i * CANVAS_WIDTH) / 4, CANVAS_HEIGHT);
    ctx.moveTo(0, (i * CANVAS_HEIGHT) / 4);
    ctx.lineTo(CANVAS_WIDTH, (i * CANVAS_HEIGHT) / 4);
  }
  ctx.stroke();
  ctx.closePath();
}



function keyboardControl(e){
//find key from keyarr

let keyIndex = keysArray.indexOf(e.keyCode);

if(tilesArray[tilesArray.length-1][0]==keyIndex){
  //re rendering
   reRenderWindow();
}



}
function mouseControl(e){
  let LastTileX = tilesArray[tilesArray.length - 1][1];
  LastTileX=(CANVAS_WIDTH)-LastTileX;
  // console.log(LastTileX+"\n"+ e.layerX);
  if (e.layerX < LastTileX + singleTileWidth && e.layerX > LastTileX){
    reRenderWindow(); 
    
  }
    
}
function reRenderWindow(){
  ctx.clearRect(0, 0, CANVAS_WIDTH, CANVAS_HEIGHT);
  let randomIndex= Math.floor(Math.random() * 4);
    tilesArray.unshift([randomIndex,CANVAS_WIDTH-((randomIndex * CANVAS_WIDTH) / 4)])
  tilesArray.pop();
  drawlines();
  for (let i = 0; i < 4; i++) {
    blacktile.draw(tilesArray[i][0], i);
    
  } 
}
window.addEventListener("DOMContentLoaded", start);

