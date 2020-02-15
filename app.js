const canvas = document.getElementById("canvas")
const canvasContext = canvas.getContext("2d")

const LEFT = "ArrowLeft"
const UP = "ArrowUp"
const RIGHT = "ArrowRight"
const DOWN = "ArrowDown"

let score = 0
document.getElementById("score").innerText = `Score: ${score}`

let snake = {
  size: 25,
  speed: 25,
  direction: null,
  body: [{ x: canvas.width / 3, y: canvas.height / 2 }]
}

let mouse = {
  size: 25,
  x: (canvas.width / 3) * 2,
  y: canvas.height / 2
}

window.addEventListener("load", function() {
  const FPS = 15
  setInterval(() => {
    drawCanvas()
    drawMouse()
    moveSnake()
    drawSnake()
    checkSnakePosition()
  }, 1000 / FPS)

  document.addEventListener("keydown", function(e) {
    if (e.code == LEFT && snake.direction != RIGHT) {snake.direction = LEFT} 
    else if (e.code == UP && snake.direction != DOWN) {snake.direction = UP} 
    else if (e.code == RIGHT && snake.direction != LEFT) {snake.direction = RIGHT} 
    else if (e.code == DOWN && snake.direction != UP) {snake.direction = DOWN}
  })
})

function drawCanvas() {
  drawRectangle(0, 0, canvas.width, canvas.height, "black")
}

function drawMouse() {
  drawRectangle(mouse.x, mouse.y, mouse.size, mouse.size, "gray")
}

function moveSnake() {
  switch (snake.direction) {
    case LEFT:
      do {
        snake.body[0].x -= snake.speed
        break
      } while (snake.direction == LEFT)
      break
    case UP:
      do {
        snake.body[0].y -= snake.speed
        break
      } while (snake.direction == UP)
      break
    case RIGHT:
      do {
        snake.body[0].x += snake.speed
        break
      } while (snake.direction == RIGHT)
      break
    case DOWN:
      do {
        snake.body[0].y += snake.speed
        break
      } while (snake.direction == DOWN)
      break
  }
}

function drawSnake() {
  snake.body.forEach((bodyPart, index) => {
    drawRectangle(snake.body[index].x, snake.body[index].y, snake.size, snake.size, "green")
    index++
  })
}

function checkSnakePosition() {
  // snake touching canvas boundary?
  if (
    snake.body[0].x < 0 ||
    snake.body[0].x >= canvas.width ||
    snake.body[0].y < 0 ||
    snake.body[0].y >= canvas.height
  ) {
    alert(`Game Over -- Final Score: ${score}`)
    snake.body[0].x = canvas.width / 2
    snake.body[0].y = canvas.height / 2
    snake.direction = null
    resetMouse()
    score = 0
    document.getElementById("score").innerText = `Score: ${score}`
  }

  // snake touching mouse?
  if (snake.body[0].x == mouse.x && snake.body[0].y == mouse.y) {
    resetMouse()
    document.getElementById("score").innerText = `Score: ${++score}`

    // switch (snake.direction) {
    //   case LEFT:
    //     snake.body.push( {x: snake.body[snake.body.length-1].x + snake.size, y: snake.body[snake.body.length-1].y} )
    //     break
    //   case UP:
    //     snake.body.push( {x: snake.body[snake.body.length-1].x, y: snake.body[snake.body.length-1].y + snake.size} )
    //     break
    //   case RIGHT:
    //     snake.body.push( {x: snake.body[snake.body.length-1].x - snake.size, y: snake.body[snake.body.length-1].y} )
    //     break
    //   case DOWN:
    //     snake.body.push( {x: snake.body[snake.body.length-1].x + snake.size, y: snake.body[snake.body.length-1].y - snake.size} )
    //     break
    // }
  }
}

function drawRectangle(x, y, width, height, color) {
  canvasContext.fillStyle = color
  canvasContext.fillRect(x, y, width, height, color)
}

function resetMouse() {
  mouse.x = getRandomNumber(0, canvas.width - mouse.size)
  mouse.y = getRandomNumber(0, canvas.height - mouse.size)
}

function getRandomNumber(min, max) {
  return (
    Math.round((Math.random() * (max - min) + min) / snake.speed) * snake.speed
  )
}