const canvas = document.getElementById("canvas")
const canvasContext = canvas.getContext("2d")

const GRID_UNIT = 25

const LEFT = "ArrowLeft"
const UP = "ArrowUp"
const RIGHT = "ArrowRight"
const DOWN = "ArrowDown"

let score = 0
document.getElementById("score").innerText = `Score: ${score}`

const snake = {
  size: 25,
  direction: null,
  body: [
    {x: canvas.width/3, y: canvas.height/2},
    {x: canvas.width/3-GRID_UNIT, y: canvas.height/2},
    {x: canvas.width/3-GRID_UNIT*2, y: canvas.height/2},
    {x: canvas.width/3-GRID_UNIT*3, y: canvas.height/2}
  ]
}

const mouse = {
  size: 25,
  x: canvas.width / 3 * 2,
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
  drawRectangle(0, 0, canvas.width, canvas.height, "black")
}

function drawMouse() {
  drawRectangle(mouse.x, mouse.y, mouse.size, mouse.size, "gray")
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
  snake.body.forEach((bodyPart, index) => {
    drawRectangle(snake.body[index].x, snake.body[index].y, snake.size, snake.size, "green")
    index++
  })
}

function checkSnakePosition() {
  // snake touching canvas boundary?
  if (snake.body[0].x < 0 || snake.body[0].x >= canvas.width || snake.body[0].y < 0 || snake.body[0].y >= canvas.height) {
    alert(`SNAKE ON BOUNDARY --Game Over -- Final Score: ${score}`)
    resetGame()
  }

  // snake head touching body?
  for (i=1; i<snake.body.length; i++) {
    if (snake.body[0].x == snake.body[i].x && snake.body[0].y == snake.body[i].y) {
      alert(`SNAKE ON SNAKE -- Game Over -- Final Score: ${score}`)
      resetGame()
    }
  }

  // snake head touching mouse?
  if (snake.body[0].x == mouse.x && snake.body[0].y == mouse.y) {
    resetMouse()
    document.getElementById("score").innerText = `Score: ${++score}`

    const xOfCurrentTail = snake.body[snake.body.length-1].x
    const yOfCurrentTail = snake.body[snake.body.length-1].y

    switch (snake.direction) {
      case LEFT:
        snake.body.push({x: xOfCurrentTail + snake.size, y: yOfCurrentTail})
        break
      case UP:
        snake.body.push({x: xOfCurrentTail, y: yOfCurrentTail + snake.size})
        break
      case RIGHT:
        snake.body.push({x: xOfCurrentTail - snake.size, y: yOfCurrentTail})
        break
      case DOWN:
        snake.body.push({x: xOfCurrentTail, y: yOfCurrentTail - snake.size})
        break
    }
  }
}

function drawRectangle(x, y, width, height, color) {
  canvasContext.fillStyle = color
  canvasContext.fillRect(x, y, width, height, color)
}

function resetMouse() {
  let mouseX = Math.round((Math.random() * (canvas.width-mouse.size - 0) + 0) / GRID_UNIT) * GRID_UNIT
  let mouseY = Math.round((Math.random() * (canvas.height-mouse.size - 0) + 0) / GRID_UNIT) * GRID_UNIT

  snake.body.forEach((bodyPart, index) => {
    if (mouseX == snake.body[index].x && mouseY == snake.body[index].y) {resetMouse()} 
    else {index++}
  })
  mouse.x = mouseX
  mouse.y = mouseY
}

function resetGame() {
  snake.body = [
    {x: canvas.width/3, y: canvas.height/2},
    {x: canvas.width/3-GRID_UNIT, y: canvas.height/2},
    {x: canvas.width/3-GRID_UNIT*2, y: canvas.height/2},
    {x: canvas.width/3-GRID_UNIT*3, y: canvas.height/2}
  ]
  snake.direction = null
  resetMouse()
  score = 0
  document.getElementById("score").innerText = `Score: ${score}`
}