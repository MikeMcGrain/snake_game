let canvas
let canvasContext
let snakeX = 600
let snakeY = 400
let snakeSpeed = 15

window.onload = function() {
  canvas = document.getElementById("canvas")
  canvasContext = canvas.getContext("2d")

  let framesPerSec = 100
  setInterval(() => {
    draw()
    moveSnake()
  }, 1000 / framesPerSec)

  document.addEventListener("keydown", function(e) {
    moveSnake(e.keyCode)
  })
}

function draw() {
  // draw canvas
  drawRect(0, 0, canvas.width, canvas.height, "black")

  // draw snake
  drawRect(snakeX, snakeY, 10, 10, "green")
}

function drawRect(leftX, topY, width, height, color) {
  canvasContext.fillStyle = color
  canvasContext.fillRect(leftX, topY, width, height, color)
}

function moveSnake(keyNum) {
  switch (keyNum) {
    case 37: // left-key 
      snakeX -= snakeSpeed
      break
    case 38: // up-key 
      snakeY -= snakeSpeed
      break
    case 39:// right-key
     snakeX += snakeSpeed
     break
    case 40: // down-key 
      snakeY += snakeSpeed
      break
  }
}
