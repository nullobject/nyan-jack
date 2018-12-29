import { Bodies } from 'matter-js'

import Entity from './Entity'

const RADIUS = 12

export default class Star extends Entity {
  constructor ({ x, y, texture }) {
    const body = Bodies.circle(x, y, RADIUS, {
      inertia: Infinity,
      label: 'star'
    })

    super({ body, texture })
  }
}
