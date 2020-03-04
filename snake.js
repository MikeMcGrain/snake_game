class Snake {
  constructor(startingLength, gridUnit, startingX, startingY) {
    this.headImage = new Image()
    this.headImage.src = "images/snake_head2.webp"
    this.headSize = 50
    this.body = []
    this.bodySize = gridUnit
    this.bodyColor = "#a0cc2d"
    this.rattleSize = 20
    this.rattleColor = "#b37700"
    this.direction = null
    this.gulp = new Audio("audio/gulp.mp3")
    this.crash = new Audio("audio/impact.mp3")

    this.resetStartingBody(startingLength, startingX, startingY)
  }

  move() {
    const copyOfSnakeBody = this.body.map(bodyPart => {
      return {x: bodyPart.x, y: bodyPart.y}
    })
  
    switch (this.direction) {
      case RIGHT: this.body[0].x += 25; break
      case LEFT: this.body[0].x -= 25; break
      case UP: this.body[0].y -= 25; break
      case DOWN: this.body[0].y += 25; break
      default: return
    }
  
    for (i=1; i<this.body.length; i++) {
      this.body[i] = {x: copyOfSnakeBody[i-1].x, y: copyOfSnakeBody[i-1].y}
    }
  }

  grow(xOfCurrentTail, yOfCurrentTail) {
    switch (this.direction) {
      case LEFT:
        this.body.push({ x: xOfCurrentTail + this.bodySize, y: yOfCurrentTail })
        break
      case UP:
        this.body.push({ x: xOfCurrentTail, y: yOfCurrentTail + this.bodySize })
        break
      case RIGHT:
        this.body.push({ x: xOfCurrentTail - this.bodySize, y: yOfCurrentTail })
        break
      case DOWN:
        this.body.push({ x: xOfCurrentTail, y: yOfCurrentTail - this.bodySize })
        break
    }
  }

  resetStartingBody(length, startingX, startingY) {
    const arrayForSnakeBody = []
    for (let i = 1; i < length; i++) {
      arrayForSnakeBody.push({
        x: startingX - this.bodySize * i,
        y: startingY
      })
    }

    this.body = arrayForSnakeBody
  }

  pause() {
    this.direction = null
  }
}
