import World from './world'
import { Engine } from 'matter-js'
import { Application } from 'pixi.js'

const WIDTH = 480
const HEIGHT = 544

export default class Game {
  constructor (resources) {
    this.app = new Application({
      width: WIDTH,
      height: HEIGHT,
      antialiasing: true,
      transparent: false,
      resolution: 1
    })

    this.engine = Engine.create()

    this.world = new World({
      width: WIDTH,
      height: HEIGHT,
      app: this.app,
      engine: this.engine,
      resources
    })

    this.app.ticker.add(delta => {
      this.update(delta)
    })
  }

  setPlayerVelocity (vector) {
    this.world.player.setVelocity(vector)
  }

  applyForceToPlayer (vector) {
    this.world.player.applyForce(vector)
  }

  update (delta) {
    Engine.update(this.engine, delta * 10)
    this.world.update(delta)
  }
}
