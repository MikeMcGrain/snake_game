const canvas = document.getElementById("canvas")
const canvasContext = canvas.getContext("2d")

const snakeSize = 20
let snakeX = canvas.width / 2
let snakeY = canvas.height / 2
let snakeSpeed = 2
let snakeDirection = 0

window.addEventListener("load", function() {
  const framesPerSec = 100
  setInterval(() => {
    checkSnakePos()
    draw()
    moveSnake()
  }, 1000 / framesPerSec)

  document.addEventListener("keydown", function(e) {
    snakeDirection = e.keyCode
    moveSnake()
  })
})

function checkSnakePos() {
  if (
    snakeX < 0 ||
    snakeX >= canvas.width - snakeSize ||
    snakeY < 0 ||
    snakeY >= canvas.height - snakeSize
  ) {
    alert(`x:${snakeX}, y:${snakeY} - Game Over`)
    snakeX = canvas.width / 2
    snakeY = canvas.height / 2
    snakeDirection = 0
  }
}

function draw() {
  // draw canvas
  drawRect(0, 0, canvas.width, canvas.height, "black")

  // draw snake
  drawRect(snakeX, snakeY, snakeSize, snakeSize, "green")
}

function drawRect(leftX, topY, width, height, color) {
  canvasContext.fillStyle = color
  canvasContext.fillRect(leftX, topY, width, height, color)
}

function moveSnake() {
  switch (snakeDirection) {
    case 37: // left-key
      do {
        snakeX -= snakeSpeed
        break
      } while (keyNum == 37)
      break
    case 38: // up-key
      do {
        snakeY -= snakeSpeed
        break
      } while (keyNum == 38)
      break
    case 39: // right-key
      do {
        snakeX += snakeSpeed
        break
      } while (keyNum == 39)
      break
    case 40: // down-key
      do {
        snakeY += snakeSpeed
        break
      } while (keyNum == 40)
      break
  }
}
