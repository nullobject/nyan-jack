import Player from './player'
import Star from './star'
import {Sprite, Texture} from 'pixi.js'
import {Engine, World, Bodies} from 'matter-js'

const WALL_THICKNESS = 10
const WIDTH = 480
const HEIGHT = 544

export default class Game {
  constructor (app, resources) {
    // Create a physics engine.
    this.engine = Engine.create()

    let texture = new Texture(resources.background.texture)
    let background = new Sprite(texture)

    this.player = new Player(resources.nyan.texture)
    this.star = new Star(resources.star.texture)

    app.stage.addChild(background)
    app.stage.addChild(this.player.sprite)
    app.stage.addChild(this.star.sprite)

    const floor = Bodies.rectangle(WIDTH / 2, HEIGHT + (WALL_THICKNESS / 2), WIDTH, WALL_THICKNESS, {isStatic: true})
    const ceiling = Bodies.rectangle(WIDTH / 2, -WALL_THICKNESS / 2, 480, WALL_THICKNESS, {isStatic: true})
    const leftWall = Bodies.rectangle(-WALL_THICKNESS / 2, HEIGHT / 2, WALL_THICKNESS, HEIGHT, {isStatic: true})
    const rightWall = Bodies.rectangle(WIDTH + (WALL_THICKNESS / 2), HEIGHT / 2, WALL_THICKNESS, HEIGHT, {isStatic: true})

    // Add all of the bodies to the world.
    World.add(this.engine.world, [floor, ceiling, leftWall, rightWall, this.player.body, this.star.body])

    // Run the engine.
    Engine.run(this.engine)
  }

  update (delta) {
    this.player.update(delta)
    this.star.update(delta)
  }
}
