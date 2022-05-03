import { Game } from './snake-game'
import './index.css'

const canvas = <HTMLCanvasElement>document.getElementById('canvas')
const game = new Game(canvas, {
  width: parseInt(canvas.getAttribute('width')),
  height: parseInt(canvas.getAttribute('height')),
  partSize: 50,
  snakeLength: 2,
  gameSpeed: 300,
  grid: true,
  wallCollision: false
})

game.start()