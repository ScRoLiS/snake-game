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

    const fieldW = config.width
    const fieldH = config.height
    const startSnakeX = fieldW % 2 ? Math.round(fieldW / 2 - 1) : fieldW / 2
    const startSnakeY = fieldH % 2 ? Math.round(fieldH / 2 - 1) : fieldH / 2

    config.width = config.width * config.partSize
    config.height = config.height * config.partSize

    canvas.setAttribute('width', config.width.toString())
    canvas.setAttribute('height', config.height.toString())

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

  renderLooseScreen(ctx: CanvasRenderingContext2D) {
    ctx.fillStyle = '#ffffffaa'
    ctx.fillRect(0, 0, this.config.width, this.config.height)
    ctx.fillStyle = '#aa0000'
    ctx.textAlign = 'center'
    ctx.font = '30px sans-serif'
    ctx.fillText(`You loose!`, this.config.width / 2, this.config.height / 2)
    ctx.font = '15px sans-serif'
    ctx.fillText(`Score: ${this.score}`, this.config.width / 2, this.config.height / 2 + 24)
  }

  renderWinScreen(ctx: CanvasRenderingContext2D) {
    ctx.fillStyle = '#ffffffaa'
    ctx.fillRect(0, 0, this.config.width, this.config.height)
    ctx.fillStyle = '#008a00'
    ctx.textAlign = 'center'
    ctx.font = '30px sans-serif'
    ctx.fillText(`You win!`, this.config.width / 2, this.config.height / 2)
    ctx.font = '15px sans-serif'
    ctx.fillText(`Score: ${this.score}`, this.config.width / 2, this.config.height / 2 + 24)
  }

  gamePlay() {
    const { width, height, partSize } = this.config
    const fieldSize = (width / partSize) * (height / partSize)

    if (this.snake.checkFoodCollision(this.food) && this.snake.getLength() < fieldSize) {
      this.snake.addPart(new SnakePart(this.snake.getLastX(), this.snake.getLastY()))
      this.food.generateNewPosition(this.snake)
      this.score++
    }

    if (this.snake.getLength() >= fieldSize) {
      console.log('WIN!', 'SCORE:', this.score);
      this.render(this.canvas)
      this.renderWinScreen(this.canvas)
      this.stop()
      return
    }

    if (this.snake.checkBodyCollision()) {
      console.log('FAIL!', 'SCORE:', this.score);
      this.renderLooseScreen(this.canvas)
      this.stop()
      return
    }

    this.render(this.canvas)
    this.snake.moveSnake()
  }

  start() {
    this.intervalId = setInterval(this.gamePlay.bind(this), this.config.gameSpeed)
  }

  stop() {
    clearInterval(this.intervalId)
  }
}