import { GameConfig } from './snake-game/snake-game';
import { Game } from './snake-game'
import './index.css'

const form = <HTMLFormElement>document.getElementById('config')
const canvas = <HTMLCanvasElement>document.getElementById('canvas')
const volume = <HTMLInputElement>document.getElementById('volume')
const showControls = <HTMLButtonElement>document.getElementById('show-controls')

const buttonUp = document.querySelector('.button--up')
const buttonDown = document.querySelector('.button--down')
const buttonLeft = document.querySelector('.button--left')
const buttonRight = document.querySelector('.button--right')

let config: GameConfig = createConfig(form)
let game = new Game(canvas, { ...config })
game.setVolume(parseInt(volume.value))

buttonUp.addEventListener('click', () => { game.snake.keyPressed(<KeyboardEvent>{ key: 'ArrowUp' }) })
buttonDown.addEventListener('click', () => { game.snake.keyPressed(<KeyboardEvent>{ key: 'ArrowDown' }) })
buttonLeft.addEventListener('click', () => { game.snake.keyPressed(<KeyboardEvent>{ key: 'ArrowLeft' }) })
buttonRight.addEventListener('click', () => { game.snake.keyPressed(<KeyboardEvent>{ key: 'ArrowRight' }) })

showControls.addEventListener('click', (e) => {
  form.classList.toggle('hide')
})

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
  return Math.abs(parseInt(str))
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
  config['foodColor'] = formData.get('foodColor').toString()

  return config
}