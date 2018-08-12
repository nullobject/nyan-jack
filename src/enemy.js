import Entity from './entity'
import {Bodies} from 'matter-js'
import {Rectangle} from 'pixi.js'
import {range} from 'fkit'

const WIDTH = 32
const HEIGHT = 36
const NUM_SPRITES = 4

export default class Enemy extends Entity {
  constructor (texture) {
    let textures = range(0, NUM_SPRITES).map(n => {
      let subtexture = texture.clone()
      subtexture.frame = new Rectangle(n * WIDTH, 0, WIDTH, HEIGHT)
      return subtexture
    })
    let body = Bodies.rectangle(200, 100, WIDTH, HEIGHT, {
      inertia: Infinity,
      label: 'Enemy'
    })
    super({body, textures})
    this.sprite.animationSpeed = 0.125
  }
}
