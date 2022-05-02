import { Game } from "./snake-game";
import { SnakePart } from "./snake-part";

export class SnakeHead extends SnakePart {

  constructor(x: number, y: number) {
    super(x, y)
  }

  render(ctx: CanvasRenderingContext2D) {
    const { partSize } = Game.config

    ctx.fillStyle = '#892f2d'
    ctx.fillRect(this.x * partSize, this.y * partSize, partSize, partSize)
    ctx.strokeStyle = '#879272'
    ctx.lineWidth = 2.5
    ctx.strokeRect(this.x * partSize + 5, this.y * partSize + 5, partSize - 10, partSize - 10)
    ctx.lineWidth = 2.5
    ctx.strokeRect(this.x * partSize, this.y * partSize, partSize, partSize)
  }
}