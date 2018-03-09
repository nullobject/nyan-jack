import {Engine, World, Bodies} from 'matter-js'

export default class Game {
  constructor () {
    this.engine = Engine.create()

    // create two boxes and a ground
    const boxA = Bodies.rectangle(400, 200, 80, 80)
    const boxB = Bodies.rectangle(450, 50, 80, 80)
    const ground = Bodies.rectangle(400, 610, 810, 60, {isStatic: true})

    // add all of the bodies to the world
    World.add(this.engine.world, [boxA, boxB, ground])

    // run the engine
    Engine.run(this.engine)
  }
}
