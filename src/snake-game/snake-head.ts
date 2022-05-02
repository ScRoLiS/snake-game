import { Game } from "./snake-game";
import { SnakePart } from "./snake-part";

export class SnakeHead extends SnakePart {

  constructor(x: number, y: number) {
    super(x, y)
  }

  render(ctx: CanvasRenderingContext2D) {
    const { partSize } = Game.config

    ctx.fillStyle = '#ff0000'
    ctx.fillRect(this.x * partSize, this.y * partSize, partSize, partSize)
  }
}