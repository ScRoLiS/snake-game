import { Game } from './snake-game'
import './index.css'

const canvas = <HTMLCanvasElement>document.getElementById('canvas')
const game = new Game(canvas, {
  width: 320,
  height: 320,
  partSize: 20,
  snakeLength: 2,
  gameSpeed: 300,
  grid: true,
  wallCollision: false
})

game.start()