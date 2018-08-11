import {Bodies} from 'matter-js'
import Actor from './actor'

const RADIUS = 17

export default class Player extends Actor {
  constructor (texture) {
    let body = Bodies.circle(400, 200, RADIUS)
    super({body, texture})
  }
}
