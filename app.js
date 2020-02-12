let canvas
let canvasContext
let snakeX = 20
let snakeY = 400
let snakeSpeed = 10

window.onload = function() {
  canvas = document.getElementById("canvas")
  canvasContext = canvas.getContext("2d")

  let framesPerSec = 100
  setInterval(() => {
    checkSnakePos()
    draw()
    moveSnake()
  }, 1000 / framesPerSec)

  document.addEventListener("keydown", function(e) {
    moveSnake(e.keyCode)
  })
}

function checkSnakePos() {
  if ((snakeX <= 0 || snakeX >= canvas.width-1) || (snakeY <= 0 || snakeY >= canvas.height-1)) {
    alert(`x:${snakeX}, y:${snakeY} - Game Over`)
    return
  }
}

function draw() {
  // draw canvas
  drawRect(0, 0, canvas.width, canvas.height, "black")

  // draw snake
  drawRect(snakeX, snakeY, 20, 20, "green")
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

function drawRect(leftX, topY, width, height, color) {
  canvasContext.fillStyle = color
  canvasContext.fillRect(leftX, topY, width, height, color)
}