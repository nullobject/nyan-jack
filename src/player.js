import Actor from './actor'
import {Rectangle} from 'pixi.js'
import {range} from 'fkit'

const WIDTH = 60
const HEIGHT = 42
const NUM_SPRITES = 5

export default class Player extends Actor {
  constructor (texture) {
    let textures = range(0, NUM_SPRITES).map(n => {
      let subtexture = texture.clone()
      subtexture.frame = new Rectangle(n * WIDTH, 0, WIDTH, HEIGHT)
      return subtexture
    })

    super({x: 400, y: 200, width: WIDTH, height: HEIGHT, textures: textures})
  }
}
