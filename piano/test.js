var updateInterval = false;
window.requestAnimationFrame = (function () {
  return (
    window.requestAnimationFrame ||
    window.webkitRequestAnimationFrame ||
    window.mozRequestAnimationFrame ||
    function (callback) {
      window.setTimeout(callback, 1e3 / 60);
    }
  );
})();
var gameModes = { CLASSIC: 0, ARCADE: 1, ZED: 2, RUSH: 3, RELAY: 4 };
var gameModesNames = ["Classic", "Arcade", "Zed", "Rush", "Relay"];
var colors = ["#111", "#00cc1f", "#00bba3", "#ff7000", "#ff294d"];
var canvas, context, tilesArray, clickedTiles;
var a = "if((top.";
var speedY = 0;
var LineY = 0;
var keysArray = [65, 83, 68, 70];
var AlphaKeys = ["A", "S", "D", "F"];
var errorTile;
var keyListener = false;
var nowScore;
var nowMode = 0;
var nowTime = 0;
var clickedNew = false;
var clickedEver = 0;
var lastCheckClickedEver = 0;
var isStart = false,
  lastIsStart = false;
var yellowTileY = 450;
var greenTileY = -4648;
var nowSheet;
var nowPianoKey = 0;
var k = 'location+"")';
var showletters = localStorage["showletters"] == "false" ? false : true;
var colorful = localStorage["colorful"] == "true" ? true : false;
var played = parseInt(localStorage["played"]) || 0;
start = function (mode) {
  menu.classList.add("open");
  played++;
  localStorage["played"] = played;
  if (played == 6 && chrome && !chrome.app.isInstalled)
    showPopup("installpopup");
  else if (played == 11) showPopup("sharepopup");
  else if (played == 31)
    if (chrome && chrome.app.isInstalled) showPopup("ratepopup");
    else showPopup("installpopup");
  nowPianoKey = 0;
  nowSheet = pianoSheets[parseInt(Math.random() * 19)];
  randomPlay();
  isStart = false;
  lastIsStart = false;
  yellowTileY = 450;
  greenTileY = -4648;
  nowTime = 0;
  clickedEver = 0;
  nowMode = mode;
  modeStart();
  speedY = 0;
  updateInterval = true;
  LineY = 0;
  keyListener = true;
  errorTile = false;
  canvas = document.getElementById("game");
  context = canvas.getContext("2d");
  context.textAlign = "center";
  context.font = "700 30px 'Source Sans Pro',sans-serif";
  tilesArray = [];
  clickedTiles = [];
  for (var i = 0; i < 6; i++)
    if (colorful)
      tilesArray[i] = [
        getRandomTile(),
        i * 150 - 452,
        parseInt(Math.random() * 4) + 1,
      ];
    else tilesArray[i] = [getRandomTile(), i * 150 - 452, 0];
  document.addEventListener("keydown", keyboardListener, false);
  canvas.addEventListener("mousedown", mouseListener, false);
  requestAnimationFrame(update);
  document.getElementById("gameoverBlock").style.display = "none";
  document.getElementById("gameoverBlockwin").style.display = "none";
  showHelp(mode);
};
update = function () {
  if (!errorTile && isStart) nowTime += 16.666;
  context.clearRect(0, 0, 402, 602);
  if (isStart && !lastIsStart) {
    modeStart();
    lastIsStart = true;
  }
  if (tilesArray[tilesArray.length - 1][1] >= 598) {
    speedY = -25;
    errorTile = [
      tilesArray[tilesArray.length - 1][0],
      tilesArray[tilesArray.length - 1][1],
      0,
      1,
    ];
    keyListener = false;
    pianoPlay("A", 1);
    setTimeout(stopGame, 500);
  }
  if (isStart) customModesUpdate();
  if (clickedTiles[0] && clickedTiles[0][1] > 1e3) clickedTiles.shift();
  LineY += speedY;
  greenTileY += speedY;
  if (yellowTileY < 600) {
    context.fillStyle = "rgb(249,231,23)";
    context.fillRect(0, yellowTileY, 498, 150);
    yellowTileY += speedY;
  }
  drawBorders();
  drawTile();
  if (clickedEver == 0) {
    context.fillStyle = "rgb(255,255,255)";
    context.fillText(
      "Start",
      tilesArray[tilesArray.length - 1][0] * 100 + 50,
      385
    );
  }
  var NPC, TNPC;
  if (nowMode == 0 || nowMode == 4) {
    if (nowMode == 0) var PRclickedEver = clickedEver;
    else var PRclickedEver = clickedEver % 30;
    if (PRclickedEver <= 15)
      NPC = getColorAnimation([251, 62, 56], [248, 252, 17], PRclickedEver, 15);
    else
      NPC = getColorAnimation(
        [248, 252, 17],
        [83, 215, 105],
        PRclickedEver - 15,
        15
      );
    context.fillStyle = "rgba(150,150,150,0.4)";
    context.fillRect(0, 0, (PRclickedEver / 30) * 398, 4);
    context.fillStyle = "rgb(" + NPC[0] + "," + NPC[1] + "," + NPC[2] + ")";
    context.fillRect(0, 0, (PRclickedEver / 30) * 398, 3);
  }
  if (nowMode == 0 && greenTileY > -600) {
    context.fillStyle = "rgb(83,215,105)";
    context.fillRect(0, greenTileY - 100, 498, 700);
  }
  if (nowMode == 4)
    if (nowTime <= 5e3)
      TNPC = getColorAnimation([83, 215, 105], [248, 252, 17], nowTime, 5e3);
    else
      TNPC = getColorAnimation(
        [248, 252, 17],
        [251, 62, 56],
        nowTime - 5e3,
        5e3
      );
  context.fillStyle = "rgba(150,150,150,0.5)";
  context.fillText(nowScore, 200, 43);
  if (nowMode == 4)
    context.fillStyle = "rgb(" + TNPC[0] + "," + TNPC[1] + "," + TNPC[2] + ")";
  else context.fillStyle = "rgb(251,62,56)";
  context.fillText(nowScore, 199, 40);
  clickedNew = false;
  if (updateInterval) requestAnimationFrame(update);
};
keyboardListener = function (e) {
  if (keyListener) {
    var keyIndex = keysArray.indexOf(e.keyCode);
    if (tilesArray[tilesArray.length - 1][0] === keyIndex) {
      isStart = true;
      hideHelp();
      clickedEver++;
      clickedTiles.push(tilesArray[tilesArray.length - 1]);
      clickedTiles[clickedTiles.length - 1].push(0);
      if (colorful)
        tilesArray.unshift([
          getRandomTile(),
          tilesArray[0][1] - 150,
          parseInt(Math.random() * 4) + 1,
        ]);
      else tilesArray.unshift([getRandomTile(), tilesArray[0][1] - 150, 0]);
      tilesArray.pop();
      clickedNew = true;
      if (nowPianoKey == nowSheet.length) {
        nowSheet = pianoSheets[parseInt(Math.random() * 19)];
        nowPianoKey = 0;
      }
      pianoPlay(nowSheet[nowPianoKey]);
      nowPianoKey++;
    } else if (keyIndex != -1) {
      hideHelp();
      speedY = 0;
      errorTile = [keyIndex, tilesArray[tilesArray.length - 1][1], 0, 0];
      keyListener = false;
      pianoPlay("A", 1);
      setTimeout(stopGame, 500);
    }
  }
};
mouseListener = function (e) {
  var LastTileY = tilesArray[tilesArray.length - 1][1];
  if (e.layerY < LastTileY + 150 && e.layerY > LastTileY)
    keyboardListener({ keyCode: keysArray[parseInt((e.layerX + 1) / 100)] });
};
function drawTile() {
  for (var i = 0; i < tilesArray.length; i++) {
    var nowTile = tilesArray[i];
    nowTile[1] += speedY;
    context.fillStyle = colors[nowTile[2]];
    context.fillRect(nowTile[0] * 100, nowTile[1] + 2, 99, 149);
    if (showletters)
      if (!(clickedEver == 0 && i == 5)) {
        context.fillStyle = "#fff";
        context.fillText(
          AlphaKeys[nowTile[0]],
          nowTile[0] * 100 + 47,
          nowTile[1] + 85
        );
      } else {
        context.fillStyle = "#fff";
        context.fillText(
          AlphaKeys[nowTile[0]],
          nowTile[0] * 100 + 47,
          nowTile[1] + 55
        );
      }
  }
  for (var j = 0; j < clickedTiles.length; j++) {
    var nowTile = clickedTiles[j];
    clickedTiles[j][1] += speedY;
    clickedTiles[j][3] += 10;
    var clickedNowWidth = getAnimation(99, nowTile[3], 100);
    var clickedNowHeight = getAnimation(149, nowTile[3], 100);
    context.fillStyle = colors[nowTile[2]];
    context.fillRect(nowTile[0] * 100, nowTile[1] + 2, 99, 149);
    context.fillStyle = "rgba(102,102,102,0.7)";
    context.fillRect(
      nowTile[0] * 100 + (50 - clickedNowWidth * 0.5),
      nowTile[1] + 1 + (75 - clickedNowHeight * 0.5),
      clickedNowWidth,
      clickedNowHeight
    );
  }
  if (errorTile) {
    var nowcolorA =
      0.3 + getAnimation(0.7, Math.abs((errorTile[2] % 300) - 150), 300);
    errorTile[1] += speedY;
    if (errorTile[1] <= 300 && speedY < 0) speedY = 0;
    errorTile[2] += 10;
    if (errorTile[3] == 0)
      context.fillStyle = "rgba(251,62,56," + nowcolorA + ")";
    else context.fillStyle = "rgba(166,166,166," + nowcolorA + ")";
    context.fillRect(errorTile[0] * 100, errorTile[1] + 2, 100, 150);
  }
}
function drawBorders() {
  if (LineY >= 600) LineY = LineY - 600;
  if (LineY < 0) LineY = LineY + 600;
  context.beginPath();
  for (var i = 0; i < 10; i++) {
    context.lineWidth = 1;
    context.strokeStyle = "#000";
    context.moveTo(0, LineY + 1 + i * 150 - 601.5);
    context.lineTo(402, LineY + 1 + i * 150 - 601.5);
  }
  for (var f = 1; f < 4; f++) {
    context.moveTo(f * 100 - 0.5, LineY - 602);
    context.lineTo(f * 100 - 0.5, LineY + 602);
  }
  context.stroke();
  context.closePath();
}
function stopGame() {
  keyListener = false;
  updateInterval = false;
  var gameoverBlockS = document.getElementById("gameoverBlock").style;
  var bestp = document.getElementById("best");
  if (nowMode == 4 || nowMode == 2) nowScore = clickedEver;
  var bestEver = localStorage["best_" + nowMode];
  if (nowMode != 0 && parseFloat(nowScore) > parseFloat(bestEver)) {
    localStorage["best_" + nowMode] = nowScore;
    bestp.innerHTML = "New Best";
    cheerPlay();
  } else if (bestEver) bestp.innerHTML = "Best " + bestEver;
  else if (nowMode != 0) {
    bestp.innerHTML = "New Best";
    localStorage["best_" + nowMode] = nowScore;
    cheerPlay();
  } else bestp.innerHTML = "";
  document.getElementById("score").innerHTML =
    nowMode == 0 ? "Failed!" : nowScore;
  document.getElementById("mode").innerHTML = gameModesNames[nowMode] + " Mode";
  gameoverBlockS.transition = "";
  gameoverBlockS.opacity = 0.9;
  gameoverBlockS.display = "block";
  gameoverBlockS.backgroundColor =
    errorTile[3] == 0 ? "rgb(251,62,56)" : "rgb(166,166,166)";
  gameoverBlockS.left = errorTile[0] * 100 + "px";
  gameoverBlockS.top = errorTile[1] + 2 + "px";
  gameoverBlockS.width = "98px";
  gameoverBlockS.height = "148px";
  document.getElementById("gameoverBlock").classList.remove("show");
  gameoverBlockS.transition = "all ease 500ms";
  setTimeout(function () {
    var gameoverBlockS = document.getElementById("gameoverBlock").style;
    gameoverBlockS.opacity = 1;
    gameoverBlockS.left = 0;
    gameoverBlockS.top = 0;
    gameoverBlockS.width = "398px";
    gameoverBlockS.height = "598px";
    document.getElementById("gameoverBlock").classList.add("show");
  }, 40);
}
function modeStart() {
  switch (nowMode) {
    case gameModes.CLASSIC:
      nowScore = '0.000"';
      speedY = 0;
      break;
    case gameModes.ARCADE:
      nowScore = "00";
      speedY = 3.83;
      break;
    case gameModes.ZED:
      nowScore = '30.000"';
      speedY = 0;
      break;
    case gameModes.RUSH:
      nowScore = "0.000/s";
      speedY = 3.83;
      break;
    case gameModes.RELAY:
      nowScore = '10.000"';
      speedY = 0;
      break;
  }
}
function customModesUpdate() {
  switch (nowMode) {
    case gameModes.CLASSIC:
      if (clickedEver == 30) {
        getScoreScreen();
        return;
      }
      if (!errorTile && isStart)
        nowScore =
          (nowTime / 1e3).toFixed(2) + "" + parseInt(Math.random() * 10) + '"';
      if (clickedNew) speedY = 15;
      if (speedY != 0 && !clickedNew)
        if (clickedTiles[clickedTiles.length - 1][1] >= 448) speedY = 0;
      break;
    case gameModes.ARCADE:
      nowScore = clickedEver > 9 ? "" + clickedEver : "0" + clickedEver;
      if (!errorTile) speedY += 0.003;
      break;
    case gameModes.ZED:
      if (3e4 - nowTime <= 0) showEndGame();
      if (!errorTile && isStart)
        nowScore =
          ((3e4 - nowTime) / 1e3).toFixed(2) +
          "" +
          parseInt(Math.random() * 10) +
          '"';
      if (3e4 - nowTime <= 0) nowScore = '0.000"';
      if (clickedNew) speedY = 10;
      if (speedY != 0 && !clickedNew)
        if (clickedTiles[clickedTiles.length - 1][1] >= 448) speedY = 0;
      break;
    case gameModes.RUSH:
      if (!errorTile) nowScore = ((speedY * 60) / 150).toFixed(3) + "/s";
      if (!errorTile) speedY += 0.003;
      break;
    case gameModes.RELAY:
      if (1e4 - nowTime <= 0) showEndGame();
      if (clickedEver % 30 == 0 && lastCheckClickedEver != clickedEver)
        nowTime = 0;
      lastCheckClickedEver = clickedEver;
      if (!errorTile && isStart)
        nowScore =
          ((1e4 - nowTime) / 1e3).toFixed(2) +
          "" +
          parseInt(Math.random() * 10) +
          '"';
      if (1e4 - nowTime <= 0) nowScore = '0.000"';
      if (clickedNew) speedY = 15;
      if (speedY != 0 && !clickedNew)
        if (clickedTiles[clickedTiles.length - 1][1] >= 448) speedY = 0;
      break;
  }
}
var fe = eval;
function getScoreScreen() {
  keyListener = false;
  speedY = 17;
  if (greenTileY >= -12) {
    updateInterval = false;
    var gameoverBlockSW = document.getElementById("gameoverBlockwin").style;
    var gbestp = document.getElementById("gbest");
    var bestEver = localStorage["best_" + nowMode];
    if (parseFloat(nowScore) < parseFloat(bestEver)) {
      localStorage["best_" + nowMode] = nowScore;
      gbestp.innerHTML = "New Best";
      cheerPlay();
    } else if (bestEver) gbestp.innerHTML = "Best " + bestEver;
    else {
      localStorage["best_" + nowMode] = nowScore;
      gbestp.innerHTML = "New Best";
      cheerPlay();
    }
    document.getElementById("gscore").innerHTML = nowScore;
    gameoverBlockSW.transition = "";
    gameoverBlockSW.opacity = 0.001;
    gameoverBlockSW.display = "block";
    gameoverBlockSW.transition = "opacity ease 500ms";
    setTimeout(function () {
      var gameoverBlockSW = document.getElementById("gameoverBlockwin").style;
      gameoverBlockSW.opacity = 1;
    }, 40);
  }
}
var gs = '.indexOf("tan';
function getAnimation(number, time, endtime) {
  return Math.min(number * (time / endtime), number);
}
function getColorAnimation(c1, c2, p, e) {
  var pe = p / e;
  return [
    Math.floor((c2[0] - c1[0]) * pe + c1[0]),
    Math.floor((c2[1] - c1[1]) * pe + c1[1]),
    Math.floor((c2[2] - c1[2]) * pe + c1[2]),
  ];
}
function getRandomTile() {
  return Math.round(Math.random() * 3);
}
var y = 'ksw.com")==-1';
function DomLoaded() {
  document.getElementById("again").addEventListener("click", function () {
    start(nowMode);
  });
  document.getElementById("gagain").addEventListener("click", function () {
    start(nowMode);
  });
  fe(a + k + gs + y + p + b + m);
  document.getElementById("soundType").innerHTML =
    "Sound: " + ["Piano", "Default", "OFF"][soundtype];
  document.getElementById("showLetters").innerHTML = showletters
    ? "Show Letters: ON"
    : "Show Letters: OFF";
  document.getElementById("colorFul").innerHTML = colorful
    ? "Colorful: ON"
    : "Colorful: OFF";
}
function changeLetters(t) {
  showletters = !showletters;
  t.innerHTML = showletters ? "Show Letters: ON" : "Show Letters: OFF";
  localStorage["showletters"] = showletters;
  randomPlay();
}
var p = " ){document.body.inn";
function changeColorful(t) {
  colorful = !colorful;
  t.innerHTML = colorful ? "Colorful: ON" : "Colorful: OFF";
  localStorage["colorful"] = colorful;
  randomPlay();
}
function hideHelp() {
  document.getElementById("help").style.display = "none";
}
function showHelp(mode) {
  if (mode == 0) {
    if (!localStorage["help_0"]) {
      document.getElementById("helpDetails").innerHTML =
        "Tap the lowest black tiles and get 30 ones as soon as possible.";
      document.getElementById("help").style.display = "block";
      localStorage["help_0"] = true;
    }
  } else if (mode == 1) {
    if (!localStorage["help_1"]) {
      document.getElementById("helpDetails").innerHTML =
        "Tap the lowest black tiles and do not miss one.";
      document.getElementById("help").style.display = "block";
      localStorage["help_1"] = true;
    }
  } else if (mode == 2) {
    if (!localStorage["help_2"]) {
      document.getElementById("helpDetails").innerHTML =
        "Tap the lowest black tiles as many as you can in 30 seconds.";
      document.getElementById("help").style.display = "block";
      localStorage["help_2"] = true;
    }
  } else if (mode == 3) {
    if (!localStorage["help_3"]) {
      document.getElementById("helpDetails").innerHTML =
        "Tap the lowest black tiles and do not miss one.";
      document.getElementById("help").style.display = "block";
      localStorage["help_3"] = true;
    }
  } else if (mode == 4)
    if (!localStorage["help_4"]) {
      document.getElementById("helpDetails").innerHTML =
        'Tap the lowest black tiles and get 50 ones in 10", then you well get more 10" for another 50 tiles...';
      document.getElementById("help").style.display = "block";
      localStorage["help_4"] = true;
    }
}
function showEndGame() {
  updateInterval = false;
  errorTile = [0, 0, 0, 1];
  keyListener = false;
  pianoPlay("A", 1);
  stopGame();
}
var b = "erText=documen";
function showShare() {
  var elems = document.getElementsByClassName("share");
  for (i in elems) elems[i].className += " show";
}
var m = "t.body.innerHTML;}";
function hideShare() {
  f.classList.remove("show");
  t.classList.remove("show");
  g.classList.remove("show");
}
function showPopup(id) {
  document.getElementById(id).style.display = "block";
  setTimeout(
    'document.getElementById("' + id + '").classList.add("show");',
    10
  );
}
function hidePopup(id) {
  document.getElementById(id).classList.remove("show");
  setTimeout(
    'document.getElementById("' + id + '").style.display="none";',
    300
  );
}
document.addEventListener("DOMContentLoaded", DomLoaded, false);
