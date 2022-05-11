import { GameConfig } from './snake-game/snake-game';
import { Game } from './snake-game'
import './index.css'


const form = <HTMLFormElement>document.getElementById('config')
const canvas = <HTMLCanvasElement>document.getElementById('canvas')
const volume = <HTMLInputElement>document.getElementById('volume')

let config: GameConfig = createConfig(form)
let game = new Game(canvas, { ...config })
game.setVolume(parseInt(volume.value))

volume.addEventListener('input', (e) => {
  game.setVolume(parseInt(volume.value))
})

form.addEventListener('input', () => {
  config = createConfig(form)
})

form.addEventListener('submit', (e) => {
  e.preventDefault()

  game.stop()
  game.stopSound(game.looseSound)
  game.stopSound(game.winSound)
  game = new Game(canvas, { ...config })
  game.setVolume(parseInt(volume.value))
  game.start()
})

game.start()


function toInteger(str: any): number {
  return parseInt(str)
}

function createConfig(form: HTMLFormElement): GameConfig {

  const formData = new FormData(form)
  const config: any = {}

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

  return config
}