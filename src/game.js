import Player from './player'
import Star from './star'
import {Sprite, Texture} from 'pixi.js'
import {Engine, World, Bodies} from 'matter-js'

const WALL_THICKNESS = 10
const WIDTH = 480
const HEIGHT = 544

export default class Game {
  constructor (app, resources) {
    this.player = new Player(resources.nyan.texture)
    let star = new Star(resources.star.texture)

    this.actors = [this.player, star]

    this.initPhysics()
    this.initSprites(app, resources)
  }

  initPhysics () {
    // Create a physics engine.
    this.engine = Engine.create()

    const floor = Bodies.rectangle(WIDTH / 2, HEIGHT + (WALL_THICKNESS / 2), WIDTH, WALL_THICKNESS, {isStatic: true})
    const ceiling = Bodies.rectangle(WIDTH / 2, -WALL_THICKNESS / 2, 480, WALL_THICKNESS, {isStatic: true})
    const leftWall = Bodies.rectangle(-WALL_THICKNESS / 2, HEIGHT / 2, WALL_THICKNESS, HEIGHT, {isStatic: true})
    const rightWall = Bodies.rectangle(WIDTH + (WALL_THICKNESS / 2), HEIGHT / 2, WALL_THICKNESS, HEIGHT, {isStatic: true})

    // Add the walls to the physics engine.
    World.add(this.engine.world, [floor, ceiling, leftWall, rightWall])

    // Add all of the actors to the physics engine.
    World.add(this.engine.world, this.actors.map(actor => actor.body))

    // Run the engine.
    Engine.run(this.engine)
  }

  initSprites (app, resources) {
    let texture = new Texture(resources.background.texture)
    let background = new Sprite(texture)
    app.stage.addChild(background)

    this.actors.map(actor => app.stage.addChild(actor.sprite))
  }

  update (delta) {
    this.actors.map(actor => actor.update(delta))
  }
}
