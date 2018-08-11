import Enemy from './enemy'
import Platform from './platform'
import Player from './player'
import Star from './star'
import {Engine, World, Bodies} from 'matter-js'
import {Sprite} from 'pixi.js'
import {concat, range} from 'fkit'

const WALL_THICKNESS = 10
const WIDTH = 480
const HEIGHT = 544

export default class Game {
  constructor (app, resources) {
    this.player = new Player(resources.nyan.texture)
    this.enemy = new Enemy(resources.bird.texture)
    const stars = range(0, 5).map(n => new Star(resources.star.texture))

    this.actors = concat([this.player, this.enemy], stars)

    // Create a physics engine.
    this.engine = Engine.create()

    this.addWalls()
    this.initSprites(app, resources)
    this.addPlatforms(app, resources)

    // Run the engine.
    Engine.run(this.engine)
  }

  addWalls () {
    const floor = Bodies.rectangle(WIDTH / 2, HEIGHT + (WALL_THICKNESS / 2), WIDTH, WALL_THICKNESS, {isStatic: true})
    const ceiling = Bodies.rectangle(WIDTH / 2, -WALL_THICKNESS / 2, 480, WALL_THICKNESS, {isStatic: true})
    const leftWall = Bodies.rectangle(-WALL_THICKNESS / 2, HEIGHT / 2, WALL_THICKNESS, HEIGHT, {isStatic: true})
    const rightWall = Bodies.rectangle(WIDTH + (WALL_THICKNESS / 2), HEIGHT / 2, WALL_THICKNESS, HEIGHT, {isStatic: true})

    // Add the walls to the physics engine.
    World.add(this.engine.world, [floor, ceiling, leftWall, rightWall])
  }

  addPlatforms (app, resources) {
    const platform = new Platform({texture: resources.tiles.texture, x: 200, y: 200})
    app.stage.addChild(platform.sprite)

    World.add(this.engine.world, platform.body)
  }

  initSprites (app, resources) {
    const background = new Sprite(resources.background.texture)
    app.stage.addChild(background)

    this.actors.map(actor => app.stage.addChild(actor.sprite))

    // Add all of the actors to the physics engine.
    World.add(this.engine.world, this.actors.map(actor => actor.body))
  }

  update (delta) {
    this.actors.map(actor => actor.update(delta))
  }
}
