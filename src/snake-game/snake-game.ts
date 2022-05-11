import { SnakeBody } from "./snake-body"
import { SnakeFood } from "./snake-food"
import { SnakePart } from "./snake-part"

import lSound from '../assets/sounds/loose.mp3'
import wSound from '../assets/sounds/win.mp3'
import bSound from '../assets/sounds/body_collide.mp3'
import fSound from '../assets/sounds/food_eaten.mp3'

export interface GameConfig {
  width: number,
  height: number,
  snakeLength: number,
  partSize: number,
  gameSpeed: number,
  grid: boolean,
  wallCollision: boolean,
  headColor: string,
  bodyColor: string,
  bgColor: string
}

export class Game {

  static config: GameConfig

  config: GameConfig
  canvas: CanvasRenderingContext2D

  snake: SnakeBody
  food: SnakeFood
  gamePlayId: NodeJS.Timer
  renderId: NodeJS.Timer
  score: number = 0

  winSound: HTMLAudioElement
  bodySound: HTMLAudioElement
  foodSound: HTMLAudioElement
  looseSound: HTMLAudioElement

  constructor(canvas: HTMLCanvasElement, config: GameConfig) {

    const fieldW = config.width
    const fieldH = config.height
    const startSnakeX = fieldW % 2 ? Math.round(fieldW / 2 - 1) : fieldW / 2
    const startSnakeY = fieldH % 2 ? Math.round(fieldH / 2 - 1) : fieldH / 2

    config.width = config.width * config.partSize
    config.height = config.height * config.partSize

    canvas.setAttribute('width', config.width.toString())
    canvas.setAttribute('height', config.height.toString())

    Game.config = config

    this.winSound = new Audio(wSound)
    this.looseSound = new Audio(lSound)
    this.bodySound = new Audio(bSound)
    this.foodSound = new Audio(fSound)

    this.canvas = canvas.getContext('2d')
    this.snake = SnakeBody.createSnake(config.snakeLength, startSnakeX, startSnakeY)
    this.food = new SnakeFood()

    this.food.generateNewPosition(this.snake)
  }

  render(ctx: CanvasRenderingContext2D) {
    this.clearCanvas(ctx)
    this.food.render(ctx)
    this.snake.render(ctx)

    if (Game.config.grid)
      this.renderGrid(ctx)
  }

  clearCanvas(ctx: CanvasRenderingContext2D) {
    const { width, height } = Game.config

    ctx.fillStyle = Game.config.bgColor
    ctx.fillRect(0, 0, width, height)
  }

  renderGrid(ctx: CanvasRenderingContext2D) {
    const { partSize: snakeSize, width, height } = Game.config

    ctx.strokeStyle = '#000000'
    ctx.lineWidth = 1.5
    for (let i = 0; i <= width / snakeSize; i++) {
      ctx.beginPath();
      ctx.moveTo(i * snakeSize, 0);
      ctx.lineTo(i * snakeSize, height);
      ctx.stroke()
    }
    for (let i = 0; i <= height / snakeSize; i++) {
      ctx.beginPath();
      ctx.moveTo(0, i * snakeSize);
      ctx.lineTo(width, i * snakeSize);
      ctx.stroke()
    }
  }

  renderLooseScreen(ctx: CanvasRenderingContext2D) {
    ctx.fillStyle = '#ffffffaa'
    ctx.fillRect(0, 0, Game.config.width, Game.config.height)
    ctx.fillStyle = '#aa0000'
    ctx.textAlign = 'center'
    ctx.font = '30px gameover'
    ctx.fillText(`You loose!`, Game.config.width / 2, Game.config.height / 2)
    ctx.font = '15px gameover'
    ctx.fillText(`Score: ${this.score}`, Game.config.width / 2, Game.config.height / 2 + 24)
  }

  renderWinScreen(ctx: CanvasRenderingContext2D) {
    ctx.fillStyle = '#ffffffaa'
    ctx.fillRect(0, 0, Game.config.width, Game.config.height)
    ctx.fillStyle = '#008a00'
    ctx.textAlign = 'center'
    ctx.font = '30px gameover'
    ctx.fillText(`You win!`, Game.config.width / 2, Game.config.height / 2)
    ctx.font = '15px gameover'
    ctx.fillText(`Score: ${this.score}`, Game.config.width / 2, Game.config.height / 2 + 24)
  }

  win() {
    console.log('WIN!', 'SCORE:', this.score);
    this.renderWinScreen(this.canvas)
    this.winSound.play()
    this.stop()
  }

  lose() {
    console.log('FAIL!', 'SCORE:', this.score);
    this.renderLooseScreen(this.canvas)
    this.looseSound.play()
    this.stop()
  }

  gamePlay() {
    const { width, height, partSize } = Game.config
    const fieldSize = (width / partSize) * (height / partSize)

    this.snake.moveSnake()

    if (this.snake.getLength() >= fieldSize) {
      this.win()
      return
    }

    if (this.snake.checkBodyCollision() || this.snake.checkWallCollision()) {
      this.bodySound.play()
      this.lose()
      return
    }

    if (this.snake.checkFoodCollision(this.food) && this.snake.getLength() < fieldSize) {
      this.stopSound(this.foodSound)
      this.snake.addPart(new SnakePart(this.snake.getLastX(), this.snake.getLastY()))
      this.food.generateNewPosition(this.snake)
      this.foodSound.play()
      this.score++
    }

  }

  stopSound(sound: HTMLAudioElement) {
    sound.pause()
    sound.currentTime = 0
  }

  setVolume(volume: number) {
    volume = volume / 100
    this.winSound.volume = volume
    this.looseSound.volume = volume
    this.foodSound.volume = volume
    this.bodySound.volume = volume
  }

  start() {
    this.gamePlayId = setInterval(this.gamePlay.bind(this), Game.config.gameSpeed)
    this.renderId = setInterval(this.render.bind(this, this.canvas), 1)
  }

  stop() {
    clearInterval(this.gamePlayId)
    clearInterval(this.renderId)
  }
}