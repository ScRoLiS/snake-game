import { Key, DirectionType, Direction } from './constants';
import { Game } from './snake-game';
import { SnakeHead } from "./snake-head";
import { SnakePart } from "./snake-part";

export class SnakeBody {

  snake: Array<SnakePart>
  snakeHead: SnakeHead
  direction: Direction

  constructor(x: number, y: number) {
    this.snake = new Array<SnakePart>()
    this.snakeHead = new SnakeHead(x, y)

    this.addPart(this.snakeHead)
    this.setDirection(DirectionType.UP)

    window.addEventListener('keydown', this.keyPressed.bind(this))
  }

  static createSnake(length: number, x: number, y: number) {
    const snake = new SnakeBody(x, y)

    for (let i = 0; i < length; i++) {
      snake.addPart(new SnakePart(x, y))
    }

    return snake
  }

  render(ctx: CanvasRenderingContext2D) {
    [...this.snake].reverse().forEach(part => {
      part.render(ctx)
    })

    this.moveSnake()
  }

  addPart(part: SnakePart) {
    this.snake.push(part)
  }


  setDirection(direction: Direction) {
    this.direction = direction
  }

  checkWallCollision() {

    const { width, height, partSize } = Game.config
    const rightBorder = width / partSize - 1
    const bottomBorder = height / partSize - 1

    if (this.snakeHead.getX() < 0)
      this.snakeHead.setX(rightBorder)

    if (this.snakeHead.getX() > rightBorder)
      this.snakeHead.setX(0)

    if (this.snakeHead.getY() < 0)
      this.snakeHead.setY(bottomBorder)

    if (this.snakeHead.getY() > bottomBorder)
      this.snakeHead.setY(0)
  }

  moveUp() {
    this.snakeHead.setY(this.snakeHead.getY() - 1);
  }

  moveDown() {
    this.snakeHead.setY(this.snakeHead.getY() + 1);
  }

  moveLeft() {
    this.snakeHead.setX(this.snakeHead.getX() - 1);
  }

  moveRight() {
    this.snakeHead.setX(this.snakeHead.getX() + 1);
  }

  moveSnake() {

    for (let i = this.snake.length - 1; i > 0; i--) {
      this.snake[i].setY(this.snake[i - 1].getY())
      this.snake[i].setX(this.snake[i - 1].getX())
    }

    switch (this.direction) {
      case DirectionType.UP:
        this.moveUp()
        break;
      case DirectionType.DOWN:
        this.moveDown()
        break;
      case DirectionType.LEFT:
        this.moveLeft()
        break;
      case DirectionType.RIGHT:
        this.moveRight()
        break;
      default:
        break;
    }

    this.checkWallCollision()
  }

  keyPressed(e: KeyboardEvent) {
    switch (e.key) {
      case Key.UP:
        this.setDirection(DirectionType.UP)
        break
      case Key.DOWN:
        this.setDirection(DirectionType.DOWN)
        break
      case Key.LEFT:
        this.setDirection(DirectionType.LEFT)
        break
      case Key.RIGHT:
        this.setDirection(DirectionType.RIGHT)
        break
      default: break
    }
  }
}