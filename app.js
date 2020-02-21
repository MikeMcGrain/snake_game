let score = 0
document.getElementById("score").innerText = `Score: ${score}`

const canvas = document.getElementById("canvas")
canvas.width = 1200
canvas.height = 800
const canvasContext = canvas.getContext("2d")
const canvasBackground = new Image()
canvasBackground.src = "images/grass-background2.jpg"

const LEFT = "ArrowLeft"
const UP = "ArrowUp"
const RIGHT = "ArrowRight"
const DOWN = "ArrowDown"

const GRID_UNIT = 25
const STARTING_BODY_LENGTH = 16

const snake = {
  size: 25,
  direction: null,
  body: makeStartingBody(STARTING_BODY_LENGTH)
}
const snakeHeadImage = new Image()
snakeHeadImage.src = "images/snake_head2.webp"

const mouse = {
  size: 25,
  x: canvas.width/3*2,
  y: canvas.height/2
}
const mouseImage = new Image()
mouseImage.src = "images/rodent.svg"

window.addEventListener("load", function() {
  const FPS = 13
  setInterval(() => {
    drawCanvas()
    drawMouse()
    moveSnake()
    drawSnake()
    checkSnakePosition()
  }, 1000 / FPS)

  document.addEventListener("keydown", function(e) {
    e.preventDefault()
    window.scrollTo(0, 200)
    switch (true) {
      case e.code == LEFT && snake.direction != RIGHT:
        snake.direction = LEFT
        break
      case e.code == UP && snake.direction != DOWN:
        snake.direction = UP
        break
      case e.code == RIGHT && snake.direction != LEFT:
        snake.direction = RIGHT
        break
      case e.code == DOWN && snake.direction != UP:
        snake.direction = DOWN
        break
    }
  })
})

function drawCanvas() {
  canvasContext.drawImage(canvasBackground, 0, 0, canvas.width, canvas.height)
}

function drawMouse() {
  canvasContext.drawImage(mouseImage, mouse.x, mouse.y, mouse.size, mouse.size)
}

function moveSnake() {
  const copyOfSnakeBody = snake.body.map(bodyPart => {
    return { x: bodyPart.x, y: bodyPart.y }
  })

  switch (snake.direction) {
    case RIGHT: snake.body[0].x += 25; break
    case LEFT: snake.body[0].x -= 25; break
    case UP: snake.body[0].y -= 25; break
    case DOWN: snake.body[0].y += 25; break
    default: return
  }

  for (i = 1; i < snake.body.length; i++) {
    snake.body[i] = { x: copyOfSnakeBody[i - 1].x, y: copyOfSnakeBody[i - 1].y }
  }
}

function drawSnake() {
  let rattleSize = 20
  snake.body.forEach((bodyPart, index) => {
    if (index >= 1 && index < snake.body.length-3) {
      drawSnakeBody(snake.body[index].x, snake.body[index].y)
    } else {
      rattleSize -= 2
      drawSnakeTail(snake.body[index].x, snake.body[index].y, rattleSize)
    }
    index++
  })
  drawSnakeHead()
}

function drawSnakeHead() {
  canvasContext.drawImage(snakeHeadImage, snake.body[0].x-13, snake.body[0].y-10, 50, 50)
}

function drawSnakeBody(x, y) {
  canvasContext.fillStyle = "#a0cc2d"
  canvasContext.fillRect(x, y, snake.size, snake.size)
}

function drawSnakeTail(x, y, rattleSize) {
  canvasContext.beginPath()
  canvasContext.arc(x + 12, y + 12, rattleSize, 0, 2 * Math.PI)
  canvasContext.fillStyle = "#b37700"
  canvasContext.fill()
}

function checkSnakePosition() {
  // snake off canvas?
  if (snake.body[0].x < 0 || snake.body[0].x >= canvas.width || snake.body[0].y < 0 || snake.body[0].y >= canvas.height) {
    alert(`SNAKE ON BOUNDARY --Game Over -- Final Score: ${score}`)
    resetGame()
  }

  // snake on snake?
  for (i = 1; i < snake.body.length; i++) {
    if (snake.body[0].x == snake.body[i].x && snake.body[0].y == snake.body[i].y) {
      alert(`SNAKE ON SNAKE -- Game Over -- Final Score: ${score}`)
      resetGame()
    }
  }

  // snake on mouse?
  if (snake.body[0].x == mouse.x && snake.body[0].y == mouse.y) {
    resetMouse()
    document.getElementById("score").innerText = `Score: ${++score}`

    const xOfCurrentTail = snake.body[snake.body.length - 1].x
    const yOfCurrentTail = snake.body[snake.body.length - 1].y

    switch (snake.direction) {
      case LEFT: snake.body.push({x: xOfCurrentTail + snake.size, y: yOfCurrentTail}); break
      case UP: snake.body.push({x: xOfCurrentTail, y: yOfCurrentTail + snake.size}); break
      case RIGHT: snake.body.push({x: xOfCurrentTail - snake.size, y: yOfCurrentTail}); break
      case DOWN: snake.body.push({x: xOfCurrentTail, y: yOfCurrentTail - snake.size}); break
    }
  }
}

function resetMouse() {
  let mouseX = Math.round((Math.random() * (canvas.width - mouse.size - 0) + 0) / GRID_UNIT) * GRID_UNIT
  let mouseY = Math.round((Math.random() * (canvas.height - mouse.size - 0) + 0) / GRID_UNIT) * GRID_UNIT

  snake.body.forEach((bodyPart, index) => {
    if (mouseX == snake.body[index].x && mouseY == snake.body[index].y) {
      resetMouse()
    } else {
      index++
    }
  })
  mouse.x = mouseX
  mouse.y = mouseY
}

function resetGame() {
  snake.body = makeStartingBody(STARTING_BODY_LENGTH)
  snake.direction = null
  resetMouse()
  score = 0
  document.getElementById("score").innerText = `Score: ${score}`
}

function makeStartingBody(length) {
  arrayForSnakeBody = []
  for (i = 1; i < length; i++) {
    arrayForSnakeBody.push({
      x: canvas.width / 3 - GRID_UNIT * i,
      y: canvas.height / 2
    })
  }
  return arrayForSnakeBody
}