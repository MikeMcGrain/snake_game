const canvas = document.getElementById("canvas")
const canvasContext = canvas.getContext("2d")

let snake = {
  size: 25,
  speed: 25,
  x: canvas.width / 3,
  y: canvas.height / 2,
  direction: 0
}

let mouse = {
  size: 25,
  x: canvas.width / 3 * 2,
  y: canvas.height / 2
}

let score = 0
document.getElementById("score").innerText = `Score: ${score}`

window.addEventListener("load", function() {
  const framesPerSec = 15
  setInterval(() => {
    drawCanvas()
    drawMouse()
    drawSnake()
    checkSnakePosition()
    moveSnake()
  }, 1000 / framesPerSec)

  document.addEventListener("keydown", function(e) {
    if (e.keyCode === 37 || e.keyCode === 38 || e.keyCode === 39 || e.keyCode === 40) {
      snake.direction = e.keyCode
    }
  })
})

function drawCanvas() {
  drawRectangle(0, 0, canvas.width, canvas.height, "black")
}

function drawMouse() {
  drawRectangle(mouse.x, mouse.y, mouse.size, mouse.size, "gray")
}

function drawSnake() {
  drawRectangle(snake.x, snake.y, snake.size, snake.size, "green")
}

function drawRectangle(leftX, topY, width, height, color) {
  canvasContext.fillStyle = color
  canvasContext.fillRect(leftX, topY, width, height, color)
}

function checkSnakePosition() {
  if (snake.x == mouse.x && snake.y == mouse.y) {
    resetMouse()
    
    document.getElementById("score").innerText = `Score: ${++score}`
  }

  if (snake.x < 0 || snake.x >= (canvas.width) || snake.y < 0 || snake.y >= (canvas.height)) {
    alert(`Game Over -- Final Score: ${score}`)
    snake.x = canvas.width / 2
    snake.y = canvas.height / 2
    resetMouse()
    snake.direction = 0
    score = 0
    document.getElementById("score").innerText = `Score: ${score}`
  }
}

function resetMouse() {
  mouse.x = getRandomNumber(0, canvas.width-mouse.size)
  mouse.y = getRandomNumber(0, canvas.height-mouse.size)
}

function getRandomNumber(min, max) {
  return Math.round((Math.random()*(max-min)+min)/snake.speed)*snake.speed
}

function moveSnake() {
  switch (snake.direction) {
    case 37: // left-key
      do {
        snake.x -= snake.speed
        break
      } while (keyNum == 37)
      break
    case 38: // up-key
      do {
        snake.y -= snake.speed
        break
      } while (keyNum == 38)
      break
    case 39: // right-key
      do {
        snake.x += snake.speed
        break
      } while (keyNum == 39)
      break
    case 40: // down-key
      do {
        snake.y += snake.speed
        break
      } while (keyNum == 40)
      break
  }
}