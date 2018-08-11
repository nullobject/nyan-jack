import {Engine, World, Bodies, Body} from 'matter-js'

export default class Game {
  constructor () {
    this.engine = Engine.create()

    // create two boxes and a ground
    this.boxA = Bodies.rectangle(400, 200, 60, 42)

    this.boxB = Bodies.rectangle(420, 50, 32, 32)

    const ground = Bodies.rectangle(400, 590, 800, 20, {isStatic: true})

    // add all of the bodies to the world
    World.add(this.engine.world, [this.boxA, this.boxB, ground])

    // run the engine
    Engine.run(this.engine)

    setInterval(() => {
      Body.setVelocity(this.boxA, {x: 0, y: -10})
    }, 2000)
  }
}
