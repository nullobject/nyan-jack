import Actor from './actor'
import {Bodies} from 'matter-js'
import {Rectangle} from 'pixi.js'
import {range} from 'fkit'

const WIDTH = 60
const HEIGHT = 37
const NUM_SPRITES = 5

export default class Player extends Actor {
  constructor (texture) {
    let textures = range(0, NUM_SPRITES).map(n => {
      let subtexture = texture.clone()
      subtexture.frame = new Rectangle(n * WIDTH, 0, WIDTH, HEIGHT)
      return subtexture
    })
    let body = Bodies.rectangle(400, 200, WIDTH, HEIGHT, {
      inertia: Infinity,
      mass: 10
    })
    super({body, textures})
    this.sprite.animationSpeed = 0.25
  }
}
