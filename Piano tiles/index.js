//variable
let canvas, ctx, CANVAS_WIDTH, CANVAS_HEIGHT,tilesArray;

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
  ctx.fillStyle = 0000;
  //tile creating
  tilesArray=[];
  for (let i = 0; i < 4; i++) {
    tilesArray.push(Math.floor(Math.random() * 4))
    
  }
  //color filling
  for (let i = 0; i < 4; i++) {
    blacktile.draw(tilesArray[i], i);
    
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

if(tilesArray[tilesArray.length-1]==keyIndex){
  //re rendering
  ctx.clearRect(0, 0, CANVAS_WIDTH, CANVAS_HEIGHT);
  tilesArray.unshift(Math.floor(Math.random() * 4));
  tilesArray.pop();
  drawlines();
  for (let i = 0; i < 4; i++) {
    blacktile.draw(tilesArray[i], i);
    
  }
}

}
function mouseControl(e){

}

window.addEventListener("DOMContentLoaded", start);

