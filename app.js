const canvas = document.getElementById("canvas")
const canvasContext = canvas.getContext("2d")

const snakeSize = 20
let snakeX = canvas.width / 2
let snakeY = canvas.height / 2
let snakeSpeed = 20
let snakeDirection = 0

const mouseSize = 20
let mouseX = getRandomNumber(0, canvas.width-mouseSize)
let mouseY = getRandomNumber(0, canvas.height-mouseSize)

let score = 0
document.getElementById("score").innerText = `Score: ${score}`

window.addEventListener("load", function() {
  const framesPerSec = 15
  setInterval(() => {
    checkSnakePos()
    draw()
    moveSnake()
  }, 1000 / framesPerSec)

  document.addEventListener("keydown", function(e) {
    if (e.keyCode === 37 || e.keyCode === 38 || e.keyCode === 39 || e.keyCode === 40) {
      snakeDirection = e.keyCode
    }
  })
})

function checkSnakePos() {
  if (snakeX == mouseX && snakeY == mouseY) {
    mouseX = getRandomNumber(0, canvas.width-mouseSize)
    mouseY = getRandomNumber(0, canvas.height-mouseSize)
    document.getElementById("score").innerText = `Score: ${++score}`
  }

  if (snakeX < 0 || snakeX >= (canvas.width) || snakeY < 0 || snakeY >= (canvas.height)) {
    alert(`Game Over -- Final Score: ${score}`)
    snakeX = canvas.width / 2
    snakeY = canvas.height / 2
    mouseX = getRandomNumber(0, canvas.width-mouseSize)
    mouseY = getRandomNumber(0, canvas.height-mouseSize)
    snakeDirection = 0
    score = 0
    document.getElementById("score").innerText = `Score: ${score}`
  }
}

function draw() {
  // draw canvas
  drawRect(0, 0, canvas.width, canvas.height, "black")

  // draw snake
  drawRect(snakeX, snakeY, snakeSize, snakeSize, "green")

  // draw mouse
  drawRect(mouseX, mouseY, mouseSize, mouseSize, "gray")
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

function getRandomNumber(min, max) {
  return Math.round((Math.random()*(max-min)+min)/20)*20
}