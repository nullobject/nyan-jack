import Player from './player'
import Star from './star'
import {Sprite, Texture} from 'pixi.js'
import {Engine, World, Bodies} from 'matter-js'

export default class Game {
  constructor (app, resources) {
    // Create a physics engine.
    this.engine = Engine.create()

    let texture = new Texture(resources.background.texture)
    this.background = new Sprite(texture)

    this.player = new Player(resources.nyan.texture)
    this.star = new Star(resources.star.texture)

    app.stage.addChild(this.background)
    app.stage.addChild(this.player.sprite)
    app.stage.addChild(this.star.sprite)

    const ground = Bodies.rectangle(240, 554, 480, 10, {isStatic: true})

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
