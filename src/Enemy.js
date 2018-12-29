import { Bodies } from 'matter-js'
import { Rectangle } from 'pixi.js'
import { range } from 'fkit'

import Entity from './Entity'
import log from './log'

const WIDTH = 32
const HEIGHT = 36
const NUM_SPRITES = 4
const WALK_VELOCITY = 0.75

/**
 * Returns `true` if the enemy should turn around, `false` otherwise.
 */
function shouldTurn (position, dir, extents) {
  return (position.x - (WIDTH / 2) <= extents[0] && dir < 0) || (position.x + (WIDTH / 2) >= extents[1] && dir > 0)
}

export default class Enemy extends Entity {
  constructor ({ x, y, texture }) {
    const body = Bodies.rectangle(x, y, WIDTH, HEIGHT, {
      inertia: Infinity,
      label: 'enemy',
      friction: 0
    })

    const textures = range(0, NUM_SPRITES).map(n => {
      let subtexture = texture.clone()
      subtexture.frame = new Rectangle(n * WIDTH, 0, WIDTH, HEIGHT)
      return subtexture
    })

    super({ body, textures })

    this.sprite.animationSpeed = 0.125
    this.dir = 1
    this.extents = null
  }

  idle () {
    log.debug('Enemy#idle')
    this.state = Entity.states.IDLE
    this.extents = null
    return this
  }

  walk (extents) {
    log.debug('Enemy#walk')
    this.state = Entity.states.WALK
    this.extents = extents
    return this
  }

  turnAround () {
    log.debug('Enemy#turnAround')
    this.dir = -this.dir
    this.sprite.scale.x = this.dir
    return this
  }

  update (delta) {
    super.update(delta)

    if (this.state === Entity.states.WALK) {
      if (this.extents && shouldTurn(this.body.position, this.dir, this.extents)) {
        this.turnAround()
      }

      this.setVelocity({ x: this.dir * WALK_VELOCITY, y: this.body.velocity.y })
    }

    return this
  }
}
