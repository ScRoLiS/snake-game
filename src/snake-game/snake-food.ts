import { SnakeBody } from './snake-body';
import { Game } from './snake-game';
import { SnakePart } from "./snake-part";

export class SnakeFood extends SnakePart {
  constructor() {
    super(3, 3)
    this.setColor(Game.config.foodColor)
  }

  generateNewPosition(snake: SnakeBody) {
    const { width, height, partSize } = Game.config
    const rightBorder = width / partSize - 1
    const bottomBorder = height / partSize - 1
    const snakeBody = snake.snake

    let newX, newY

    do {
      newX = Math.round(Math.random() * rightBorder)
      newY = Math.round(Math.random() * bottomBorder)

      for (let i = 0; i < snakeBody.length; i++) {
        if (newX === snakeBody[i].getX() && newY === snakeBody[i].getY()) {
          newX = null
          newY = null
          break
        }
      }

    } while (newX === null && newY === null)

    this.setX(newX)
    this.setY(newY)
  }
}