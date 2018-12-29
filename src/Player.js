import { Bodies } from 'matter-js'
import { Rectangle } from 'pixi.js'
import { range } from 'fkit'

import Entity from './Entity'
import log from './log'

const WIDTH = 60
const HEIGHT = 37
const NUM_SPRITES = 5

export default class Player extends Entity {
  constructor ({ x, y, texture }) {
    const body = Bodies.rectangle(x, y, WIDTH, HEIGHT, {
      inertia: Infinity,
      label: 'player',
      mass: 10,
      friction: 0
    })

    const textures = range(0, NUM_SPRITES).map(n => {
      let subtexture = texture.clone()
      subtexture.frame = new Rectangle(n * WIDTH, 0, WIDTH, HEIGHT)
      return subtexture
    })

    super({ body, textures })

    this.sprite.animationSpeed = 0.25
  }

  idle () {
    log.debug('Player#idle')
    this.state = Entity.states.IDLE
    return this
  }
}
