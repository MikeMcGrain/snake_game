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
