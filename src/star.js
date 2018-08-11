import {Bodies} from 'matter-js'
import Actor from './actor'

const RADIUS = 12

export default class Star extends Actor {
  constructor (texture) {
    let body = Bodies.circle(400, 200, RADIUS, {isStatic: true})
    super({body, texture})
  }
}
