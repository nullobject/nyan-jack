import Player from './player'
import Star from './star'
import {Engine, World, Bodies} from 'matter-js'

export default class Game {
  constructor (resources) {
    this.engine = Engine.create()

    this.player = new Player(resources.nyan.texture)
    this.star = new Star(resources.star.texture)

    const ground = Bodies.rectangle(400, 590, 800, 20, {isStatic: true})

    // add all of the bodies to the world
    World.add(this.engine.world, [this.player.body, this.star.body, ground])

    // run the engine
    Engine.run(this.engine)
  }
}
