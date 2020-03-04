const GRID_UNIT = 25
const CANVAS_WIDTH = 600
const CANVAS_HEIGHT = 600
const FRAMES_PER_SECOND = 11
const STARTING_BODY_LENGTH = 15

const LEFT = "ArrowLeft"
const UP = "ArrowUp"
const RIGHT = "ArrowRight"
const DOWN = "ArrowDown"
const SPACE = "Space"

window.addEventListener("load", function() {
  const canvas = document.getElementById("canvas")
  canvas.width = CANVAS_WIDTH
  canvas.height = CANVAS_HEIGHT
  const canvasBackground = new Image()
  canvasBackground.src = "images/grass-background3.jpeg"
  const canvasContext = canvas.getContext("2d")

  const snake = new Snake(STARTING_BODY_LENGTH, GRID_UNIT, CANVAS_WIDTH / 3, CANVAS_HEIGHT / 2)
  const mouse = new Mouse(CANVAS_WIDTH / 3 *2, CANVAS_HEIGHT / 2)

  setInterval(() => {
    drawCanvas(canvasContext, canvasBackground)
    drawMouse(canvasContext, mouse)
    snake.move()
    drawSnake(canvasContext, snake)
    checkSnakePositions(snake, mouse)
  }, 1000 / FRAMES_PER_SECOND)

  document.addEventListener("keydown", function(e) {
    e.preventDefault()
    switch (true) {
      case e.code === LEFT && snake.direction !== RIGHT:
        snake.direction = LEFT
        break
      case e.code === UP && snake.direction !== DOWN:
        snake.direction = UP
        break
      case e.code === RIGHT && snake.direction !== LEFT:
        snake.direction = RIGHT
        break
      case e.code === DOWN && snake.direction !== UP:
        snake.direction = DOWN
        break
      case e.code === SPACE:
        snake.pause()
        break
    }
  })
  updateScores(0)
})

function drawCanvas(canvasContext, canvasBackground) {
  canvasContext.drawImage(canvasBackground, 0, 0, canvasContext.canvas.width, canvasContext.canvas.height)
}

function drawMouse(canvasContext, mouse) {
  canvasContext.drawImage(mouse.image, mouse.x, mouse.y, mouse.size, mouse.size)
}

function drawSnake(canvasContext, snake) {
  let rattleSize = snake.rattleSize
  snake.body.forEach((bodyPart, index) => {
    (index > 0 && index < snake.body.length-3) 
      ? drawSnakeBody(snake.body[index].x, snake.body[index].y, canvasContext, snake) 
      : (rattleSize -= 2, drawSnakeRattle(snake.body[index].x, snake.body[index].y, rattleSize, canvasContext, snake))
    index++
  })
  drawSnakeHead(canvasContext, snake)
}

function drawSnakeBody(x, y, canvasContext, snake) {
  canvasContext.fillStyle = snake.bodyColor
  canvasContext.fillRect(x, y, snake.bodySize, snake.bodySize)
}

function drawSnakeRattle(x, y, rattleSize, canvasContext, snake) {
  canvasContext.beginPath()
  canvasContext.arc(x + 12, y + 12, rattleSize, 0, 2 * Math.PI)
  canvasContext.fillStyle = snake.rattleColor
  canvasContext.fill()
}

function drawSnakeHead(canvasContext, snake) {
  canvasContext.drawImage(snake.headImage, snake.body[0].x-13, snake.body[0].y-13, snake.headSize, snake.headSize)
}

function checkSnakePositions(snake, mouse) {
  // snake on mouse?
  if (snake.body[0].x === mouse.x && snake.body[0].y === mouse.y) {
    snake.gulp.play()
    mouse.move(snake, mouse, GRID_UNIT, CANVAS_WIDTH, CANVAS_HEIGHT)
    snake.grow(snake.body[snake.body.length-1].x, snake.body[snake.body.length-1].y)
    updateScores(1)
  }

  // snake off canvas?
  if (snake.body[0].x < 0 || snake.body[0].x >= CANVAS_WIDTH || snake.body[0].y < 0 || snake.body[0].y >= CANVAS_HEIGHT) {
    resetGame(snake,mouse)
  }

  // snake on snake?
  for (i = 1; i < snake.body.length; i++) {
    if (snake.body[0].x === snake.body[i].x && snake.body[0].y === snake.body[i].y) {
      resetGame(snake, mouse)
    }
  }
}

function updateScores(num) {
  let currentScore = parseInt(document.getElementById("score").innerText)
  let previousHighScore = parseInt(localStorage.getItem("best_score")) || 0

  if (num === 0) {
    document.getElementById("score").innerText = 0
  } else {
    currentScore += num
    document.getElementById("score").innerText = currentScore
  }
  
  if (currentScore > previousHighScore) {
    document.getElementById("best-score").innerText = currentScore
    localStorage.setItem("best_score", JSON.parse(currentScore))
  } else {
    document.getElementById("best-score").innerText = previousHighScore
  }
}

function resetGame(snake, mouse) {
  snake.crash.play()
  alert("Game Over")
  snake.pause()
  snake.resetStartingBody(STARTING_BODY_LENGTH, CANVAS_WIDTH / 3, CANVAS_HEIGHT /2)
  mouse.resetStartingPosition(CANVAS_WIDTH/3*2, CANVAS_HEIGHT/2)
  updateScores(0)
}