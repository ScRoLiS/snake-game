import { GameConfig } from './snake-game/snake-game';
import { Game } from './snake-game'
import './index.css'

let config: GameConfig = {
  width: 15,
  height: 20,
  partSize: 20,
  snakeLength: 2,
  gameSpeed: 300,
  grid: false,
  wallCollision: false
}

const form = <HTMLFormElement>document.getElementById('config')
const canvas = <HTMLCanvasElement>document.getElementById('canvas')
let game = new Game(canvas, { ...config })

const toInteger = (str: any): number => {
  return parseInt(str)
}

form.addEventListener('change', () => {
  const formData = new FormData(form)

  config['width'] = toInteger(formData.get('width'))
  config['height'] = toInteger(formData.get('height'))
  config['partSize'] = toInteger(formData.get('partSize'))
  config['snakeLength'] = toInteger(formData.get('snakeLength'))
  config['gameSpeed'] = toInteger(formData.get('gameSpeed'))
  config['grid'] = formData.get('grid') ? true : false
  config['wallCollision'] = formData.get('wallCollision') ? true : false
})


form.addEventListener('submit', (e) => {
  e.preventDefault()
  game.stop()

  game = new Game(canvas, { ...config })

  game.start()
})