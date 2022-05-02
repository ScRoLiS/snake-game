import { SnakeBody } from "./snake-body"

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

  constructor(canvas: HTMLCanvasElement, config: GameConfig) {
    Game.config = config

    this.config = config
    this.canvas = canvas.getContext('2d')
    this.snake = SnakeBody.createSnake(config.snakeLength, config.width / config.partSize / 2, config.height / config.partSize / 2)
  }

  render(ctx: CanvasRenderingContext2D) {
    this.clearCanvas(ctx)
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

  start() {
    this.render(this.canvas)
    setInterval(() => {
      this.render(this.canvas)
    }, this.config.gameSpeed)
  }
}