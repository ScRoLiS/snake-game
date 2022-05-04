import { Game } from "./snake-game";
import { SnakePart } from "./snake-part";

export class SnakeHead extends SnakePart {

  constructor(x: number, y: number) {
    super(x, y)
    this.setColor(Game.config.headColor)
  }
}