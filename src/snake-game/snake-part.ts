import { Game } from "./snake-game"

export class SnakePart {

  x: number
  y: number

  constructor(x: number, y: number) {
    this.setX(x)
    this.setY(y)
  }

  render(ctx: CanvasRenderingContext2D) {
    const { partSize: snakeSize } = Game.config

    ctx.fillStyle = '#00aaee'
    ctx.fillRect(this.x * snakeSize, this.y * snakeSize, snakeSize, snakeSize)
  }

  setX(x: number) {
    this.x = x
  }

  setY(y: number) {
    this.y = y
  }

  getX(): number {
    return this.x
  }

  getY(): number {
    return this.y
  }
}