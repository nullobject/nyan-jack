import {Bodies} from 'matter-js'
import Entity from './entity'

const RADIUS = 12

export default class Star extends Entity {
  constructor (texture) {
    let body = Bodies.circle(100, 200, RADIUS, {
      inertia: Infinity,
      // isStatic: true,
      label: 'Star'
    })
    super({body, texture})
  }
}
