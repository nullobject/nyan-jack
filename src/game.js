import Player from './player'
import Star from './star'
import {Engine, World, Bodies} from 'matter-js'

export default class Game {
  constructor (app, resources) {
    this.engine = Engine.create()

    this.player = new Player(resources.nyan.texture)
    this.star = new Star(resources.star.texture)

    app.stage.addChild(this.player.sprite)
    app.stage.addChild(this.star.sprite)

    const ground = Bodies.rectangle(400, 590, 800, 20, {isStatic: true})

    // Add all of the bodies to the world.
    World.add(this.engine.world, [this.player.body, this.star.body, ground])

    // Run the engine.
    Engine.run(this.engine)
  }

  update (delta) {
    this.player.update(delta)
    this.star.update(delta)
  }
}
