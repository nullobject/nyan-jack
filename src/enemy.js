import { default as Entity, states } from './entity'
import {Bodies} from 'matter-js'
import {Rectangle} from 'pixi.js'
import {range} from 'fkit'

const WIDTH = 32
const HEIGHT = 36
const NUM_SPRITES = 4
const WALK_VELOCITY = 0.75

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
    this.dir = 1
    this.state = states.WALK
  }

  update (delta) {
    super.update(delta)

    if (this.state === states.WALK) {
      this.setVelocity({x: this.dir * WALK_VELOCITY, y: 0})
    }
  }
}
