import Sprite from './sprite'
import {Texture} from 'pixi.js'

const WIDTH = 32
const HEIGHT = 32

export default class Player extends Sprite {
  constructor (resource) {
    let texture = new Texture(resource)
    super({x: 420, y: 50, width: WIDTH, height: HEIGHT, texture: texture})
  }
}