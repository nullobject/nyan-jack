import {Engine, World, Bodies, Body} from 'matter-js'
import nyanSprite from '../assets/images/nyan.png'
import starSprite from '../assets/images/star.png'

export default class Game {
  constructor () {
    this.engine = Engine.create()

    // create two boxes and a ground
    this.boxA = Bodies.rectangle(400, 200, 80, 80, {
      render: {
        sprite: {
          texture: nyanSprite
        }
      }
    })

    this.boxB = Bodies.rectangle(450, 50, 80, 80, {
      render: {
        sprite: {
          texture: starSprite
        }
      }
    })

    const ground = Bodies.rectangle(400, 610, 810, 60, {isStatic: true})

    // add all of the bodies to the world
    World.add(this.engine.world, [this.boxA, this.boxB, ground])

    // run the engine
    Engine.run(this.engine)

    setInterval(() => {
      Body.setVelocity(boxA, {x: 0, y: -10})
    }, 2000)
  }
}
