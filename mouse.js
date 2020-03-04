class Mouse {
  constructor(x, y) {
    this.image = new Image()
    this.image.src = "images/rodent.svg"
    this.size = 30
    this.x = x
    this.y = y
  }

  move(snake, mouse, gridUnit, canvasWidth, canvasHeight) {
    let mouseX = Math.round((Math.random() * (canvasWidth - mouse.size - 0) + 0) / gridUnit) * gridUnit
    let mouseY = Math.round((Math.random() * (canvasHeight - mouse.size - 0) + 0) / gridUnit) * gridUnit
  
    const mouseIsPlacedOnSnakePart = () => {
      return snake.body.filter(bodyPart => bodyPart.x === mouseX && bodyPart.y === mouseY).length > 0;
    }
  
    while(mouseIsPlacedOnSnakePart()) {
      mouseX = Math.round((Math.random() * (canvasWidth - mouse.size - 0) + 0) / gridUnit) * gridUnit
      mouseY = Math.round((Math.random() * (canvasHeight - mouse.size - 0) + 0) / gridUnit) * gridUnit
    }

    this.x = mouseX
    this.y = mouseY
  }

  resetStartingPosition(startingX, startingY) {
    this.x = startingX
    this.y = startingY
  }
}
