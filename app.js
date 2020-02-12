let canvas = document.getElementById("canvas")
let canvasContext = canvas.getContext("2d")

let snakeX = canvas.width / 2
let snakeY = canvas.height / 2
let snakeSpeed = 10

window.onload = function() {
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
  if (
    snakeX <= 0 ||
    snakeX >= canvas.width - 1 ||
    snakeY <= 0 ||
    snakeY >= canvas.height - 1
  ) {
    alert(`x:${snakeX}, y:${snakeY} - Game Over`)
    snakeX = canvas.width / 2
    snakeY = canvas.height / 2
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
    case 39: // right-key
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