import { Bodies } from 'matter-js'
import Entity from './entity'

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
