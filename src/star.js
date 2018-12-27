import Entity from './entity'

import { Bodies } from 'matter-js'

const RADIUS = 12

export default class Star extends Entity {
  static label = 'star'

  constructor (texture) {
    let body = Bodies.circle(100, 200, RADIUS, {
      inertia: Infinity,
      label: Star.label
    })
    super({ body, texture })
  }
}
