const canvas = document.getElementById("canvas")
canvas.width = 600
canvas.height = 600
const canvasBackground = new Image()
canvasBackground.src = "images/grass-background3.jpeg"
const canvasContext = canvas.getContext("2d")

const GRID_UNIT = 25
const FRAMES_PER_SECOND = 11
const STARTING_BODY_LENGTH = 15

const LEFT = "ArrowLeft"
const UP = "ArrowUp"
const RIGHT = "ArrowRight"
const DOWN = "ArrowDown"

const snake = {
  headImage: new Image(),
  headSize: 50,
  body: makeStartingBody(STARTING_BODY_LENGTH),
  bodySize: GRID_UNIT,
  bodyColor: "#a0cc2d",
  rattleSize: 20,
  rattleColor: "#b37700",
  direction: null,
  gulp: new Audio("audio/gulp.mp3"),
  crash: new Audio("audio/impact.mp3")
}
snake.headImage.src = "images/snake_head2.webp"

const mouse = {
  image: new Image(),
  size: 30,
  x: canvas.width/3*2,
  y: canvas.height/2
}
mouse.image.src = "images/rodent.svg"

window.addEventListener("load", function() {
  setInterval(() => {
    drawCanvas()
    drawMouse()
    moveSnake()
    drawSnake()
    checkSnakePositions()
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
    }
  })
  updateScores(0)
})

function drawCanvas() {
  canvasContext.drawImage(canvasBackground, 0, 0, canvas.width, canvas.height)
}

function drawMouse() {
  canvasContext.drawImage(mouse.image, mouse.x-3, mouse.y-5, mouse.size, mouse.size)
}

function moveSnake() {
  const copyOfSnakeBody = snake.body.map(bodyPart => {
    return {x: bodyPart.x, y: bodyPart.y}
  })

  switch (snake.direction) {
    case RIGHT: snake.body[0].x += 25; break
    case LEFT: snake.body[0].x -= 25; break
    case UP: snake.body[0].y -= 25; break
    case DOWN: snake.body[0].y += 25; break
    default: return
  }

  for (i=1; i<snake.body.length; i++) {
    snake.body[i] = {x: copyOfSnakeBody[i-1].x, y: copyOfSnakeBody[i-1].y}
  }
}

function drawSnake() {
  let rattleSize = snake.rattleSize
  snake.body.forEach((bodyPart, index) => {
    (index > 0 && index < snake.body.length-3) 
      ? drawSnakeBody(snake.body[index].x, snake.body[index].y) 
      : (rattleSize -= 2, drawSnakeRattle(snake.body[index].x, snake.body[index].y, rattleSize))
    index++
  })
  drawSnakeHead()
}

function drawSnakeBody(x, y) {
  canvasContext.fillStyle = snake.bodyColor
  canvasContext.fillRect(x, y, snake.bodySize, snake.bodySize)
}

function drawSnakeRattle(x, y, rattleSize) {
  canvasContext.beginPath()
  canvasContext.arc(x + 12, y + 12, rattleSize, 0, 2 * Math.PI)
  canvasContext.fillStyle = snake.rattleColor
  canvasContext.fill()
}

function drawSnakeHead() {
  canvasContext.drawImage(snake.headImage, snake.body[0].x-13, snake.body[0].y-13, snake.headSize, snake.headSize)
}

function checkSnakePositions() {
  // snake on mouse?
  if (snake.body[0].x === mouse.x && snake.body[0].y === mouse.y) {
    snake.gulp.play()
    moveMouse()
    
    const xOfCurrentTail = snake.body[snake.body.length-1].x
    const yOfCurrentTail = snake.body[snake.body.length-1].y
    switch (snake.direction) {
      case LEFT: snake.body.push({x: xOfCurrentTail + snake.bodySize, y: yOfCurrentTail}); break
      case UP: snake.body.push({x: xOfCurrentTail, y: yOfCurrentTail + snake.bodySize}); break
      case RIGHT: snake.body.push({x: xOfCurrentTail - snake.bodySize, y: yOfCurrentTail}); break
      case DOWN: snake.body.push({x: xOfCurrentTail, y: yOfCurrentTail - snake.bodySize}); break
    }
    updateScores(1)
  }

  // snake off canvas?
  if (snake.body[0].x < 0 || snake.body[0].x >= canvas.width || snake.body[0].y < 0 || snake.body[0].y >= canvas.height) {
    snake.crash.play()
    alert("Game Over")
    resetGame()
  }

  // snake on snake?
  for (i = 1; i < snake.body.length; i++) {
    if (snake.body[0].x === snake.body[i].x && snake.body[0].y === snake.body[i].y) {
      snake.crash.play()
      alert("Game Over")
      resetGame()
    }
  }
}

function moveMouse() {
  let mouseX = Math.round((Math.random() * (canvas.width - mouse.size - 0) + 0) / GRID_UNIT) * GRID_UNIT
  let mouseY = Math.round((Math.random() * (canvas.height - mouse.size - 0) + 0) / GRID_UNIT) * GRID_UNIT

  const mouseIsPlacedOnSnakePart = () => {
    return snake.body.filter(bodyPart => bodyPart.x === mouseX && bodyPart.y === mouseY).length > 0;
  }

  while(mouseIsPlacedOnSnakePart()) {
    mouseX = Math.round((Math.random() * (canvas.width - mouse.size - 0) + 0) / GRID_UNIT) * GRID_UNIT
    mouseY = Math.round((Math.random() * (canvas.height - mouse.size - 0) + 0) / GRID_UNIT) * GRID_UNIT
  }
  mouse.x = mouseX
  mouse.y = mouseY
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

function resetGame() {
  snake.body = makeStartingBody(STARTING_BODY_LENGTH)
  snake.direction = null
  mouse.x = canvas.width/3*2
  mouse.y = canvas.height/2
  updateScores(0)
}

function makeStartingBody(length) {
  arrayForSnakeBody = []
  for (i=1; i<length; i++) {
    arrayForSnakeBody.push({
      x: canvas.width / 3 - GRID_UNIT * i,
      y: canvas.height / 2
    })
  }
  return arrayForSnakeBody
}