import Actor from './actor'

const WIDTH = 32
const HEIGHT = 32

export default class Player extends Actor {
  constructor (texture) {
    super({x: 420, y: 50, width: WIDTH, height: HEIGHT, texture: texture})
  }
}
