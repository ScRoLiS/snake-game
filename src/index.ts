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
  wallCollision: false,
  bodyColor: '#000000',
  headColor: '#892f2d',
  bgColor: '#879272'
}

const form = <HTMLFormElement>document.getElementById('config')
const canvas = <HTMLCanvasElement>document.getElementById('canvas')
let game = new Game(canvas, { ...config })
game.start()

const toInteger = (str: any): number => {
  return parseInt(str)
}

form.addEventListener('input', () => {
  const formData = new FormData(form)

  config['width'] = toInteger(formData.get('width'))
  config['height'] = toInteger(formData.get('height'))
  config['partSize'] = toInteger(formData.get('partSize'))
  config['snakeLength'] = toInteger(formData.get('snakeLength'))
  config['gameSpeed'] = toInteger(formData.get('gameSpeed'))
  config['grid'] = formData.get('grid') ? true : false
  config['wallCollision'] = formData.get('wallCollision') ? true : false
  config['bgColor'] = formData.get('bgColor').toString()
  config['headColor'] = formData.get('headColor').toString()
  config['bodyColor'] = formData.get('bodyColor').toString()
})


form.addEventListener('submit', (e) => {
  e.preventDefault()
  game.stop()

  game = new Game(canvas, { ...config })

  game.start()
})