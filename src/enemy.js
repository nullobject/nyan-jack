import { Bodies } from 'matter-js'
import { Rectangle } from 'pixi.js'
import { range } from 'fkit'

import Entity from './entity'

const WIDTH = 32
const HEIGHT = 36
const NUM_SPRITES = 4
const WALK_VELOCITY = 0.75

export default class Enemy extends Entity {
  static label = 'enemy'

  constructor (texture) {
    let textures = range(0, NUM_SPRITES).map(n => {
      let subtexture = texture.clone()
      subtexture.frame = new Rectangle(n * WIDTH, 0, WIDTH, HEIGHT)
      return subtexture
    })

    let body = Bodies.rectangle(100, 100, WIDTH, HEIGHT, {
      inertia: Infinity,
      label: Enemy.label,
      friction: 0
    })

    super({ body, textures })

    this.sprite.animationSpeed = 0.125
    this.dir = 1
  }

  walk () {
    this.state = Entity.states.WALK
  }

  turnAround () {
    this.dir = -this.dir
    this.sprite.scale.x = this.dir
  }

  update (delta) {
    super.update(delta)

    if (this.state === Entity.states.WALK) {
      this.setVelocity({ x: this.dir * WALK_VELOCITY, y: 0 })
    }
  }
}
