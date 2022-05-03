import { SnakeBody } from "./snake-body"
import { SnakeFood } from "./snake-food"
import { SnakePart } from "./snake-part"

export interface GameConfig {
  width: number,
  height: number,
  snakeLength: number,
  partSize: number,
  gameSpeed: number,
  grid: boolean,
  wallCollision: boolean
}

export class Game {

  static config: GameConfig

  config: GameConfig
  canvas: CanvasRenderingContext2D

  snake: SnakeBody
  food: SnakeFood
  intervalId: NodeJS.Timer
  score: number = 0

  constructor(canvas: HTMLCanvasElement, config: GameConfig) {
    const startSnakeX = config.width / config.partSize / 2
    const startSnakeY = config.height / config.partSize / 2

    Game.config = config

    this.config = config
    this.canvas = canvas.getContext('2d')
    this.snake = SnakeBody.createSnake(config.snakeLength, startSnakeX, startSnakeY)
    this.food = new SnakeFood()

    this.food.generateNewPosition(this.snake)
  }

  render(ctx: CanvasRenderingContext2D) {
    this.clearCanvas(ctx)
    this.food.render(ctx)
    this.snake.render(ctx)

    if (this.config.grid)
      this.renderGrid(ctx)
  }

  clearCanvas(ctx: CanvasRenderingContext2D) {
    const { width, height } = this.config

    ctx.fillStyle = '#879272'
    ctx.fillRect(0, 0, width, height)
  }

  renderGrid(ctx: CanvasRenderingContext2D) {
    const { partSize: snakeSize, width, height } = this.config

    ctx.strokeStyle = '#000000'
    ctx.lineWidth = 1.5
    for (let i = 0; i <= width / snakeSize; i++) {
      ctx.beginPath();
      ctx.moveTo(i * snakeSize, 0);
      ctx.lineTo(i * snakeSize, height);
      ctx.stroke()
    }
    for (let i = 0; i <= height / snakeSize; i++) {
      ctx.beginPath();
      ctx.moveTo(0, i * snakeSize);
      ctx.lineTo(width, i * snakeSize);
      ctx.stroke()
    }
  }

  gamePlay() {
    const { width, height, partSize } = this.config

    if (this.snake.checkFoodCollision(this.food)) {
      this.snake.addPart(new SnakePart(this.snake.getLastX(), this.snake.getLastY()))
      this.food.generateNewPosition(this.snake)
      this.score++
      console.log(this.score);
    }

    this.render(this.canvas)
    this.snake.moveSnake()

    if (this.snake.getLength() >= (width / partSize) * (height / partSize)) {
      console.log('WIN!', 'SCORE:', this.score);
      this.stop()
    }
    if (this.snake.checkBodyCollision()) {
      console.log('FAIL!', 'SCORE:', this.score);
      this.stop()
    }
  }

  start() {
    this.intervalId = setInterval(this.gamePlay.bind(this), this.config.gameSpeed)
  }

  stop() {
    clearInterval(this.intervalId)
  }
}