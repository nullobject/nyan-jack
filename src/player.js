import * as Pixi from 'pixi.js'
import {range} from 'fkit'
import Sprite from './sprite'

const WIDTH = 60
const HEIGHT = 42
const NUM_SPRITES = 5

export default class Player extends Sprite {
  constructor (resource) {
    let textures = range(0, NUM_SPRITES).map(n => {
      let texture = new Pixi.Texture(resource)
      texture.frame = new Pixi.Rectangle(n * WIDTH, 0, WIDTH, HEIGHT)
      return texture
    })

    super({x: 400, y: 200, width: WIDTH, height: HEIGHT, textures: textures})
  }
}
