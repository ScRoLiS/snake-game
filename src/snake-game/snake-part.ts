import { Game } from "./snake-game"

export class SnakePart {

  x: number
  y: number
  color: string

  constructor(x: number, y: number) {
    this.setX(x)
    this.setY(y)
    this.setColor('#000000')
  }

  render(ctx: CanvasRenderingContext2D) {
    const { partSize } = Game.config

    ctx.fillStyle = this.color
    ctx.fillRect(this.x * partSize, this.y * partSize, partSize, partSize)
    ctx.strokeStyle = '#879272'
    ctx.lineWidth = 2.5
    ctx.strokeRect(this.x * partSize + 5, this.y * partSize + 5, partSize - 10, partSize - 10)
    ctx.lineWidth = 2.5
    ctx.strokeRect(this.x * partSize, this.y * partSize, partSize, partSize)
  }

  setX(x: number) {
    this.x = x
  }

  setY(y: number) {
    this.y = y
  }

  setColor(color: string) {
    this.color = color
  }

  getX(): number {
    return this.x
  }

  getY(): number {
    return this.y
  }
}