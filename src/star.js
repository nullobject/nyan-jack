import * as Pixi from 'pixi.js'
import Sprite from './sprite'

const WIDTH = 32
const HEIGHT = 32

export default class Player extends Sprite {
  constructor (resource) {
    let texture = new Pixi.Texture(resource)
    super({x: 420, y: 50, width: WIDTH, height: HEIGHT, texture: texture})
  }
}
