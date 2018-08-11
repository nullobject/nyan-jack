import Actor from './actor'
import {Rectangle, Texture} from 'pixi.js'
import {range} from 'fkit'

const WIDTH = 60
const HEIGHT = 42
const NUM_SPRITES = 5

export default class Player extends Actor {
  constructor (resource) {
    let textures = range(0, NUM_SPRITES).map(n => {
      let texture = new Texture(resource)
      texture.frame = new Rectangle(n * WIDTH, 0, WIDTH, HEIGHT)
      return texture
    })

    super({x: 400, y: 200, width: WIDTH, height: HEIGHT, textures: textures})
  }
}
