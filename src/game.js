import Enemy from './enemy'
import Platform from './platform'
import Player from './player'
import Star from './star'
import {Engine, Events, World, Bodies} from 'matter-js'
import {Application, Sprite} from 'pixi.js'
import {concat, range} from 'fkit'

const WALL_THICKNESS = 10
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

    // Create a physics engine.
    this.engine = Engine.create()

    this.player = new Player(resources.nyan.texture)
    this.enemy = new Enemy(resources.bird.texture)
    this.stars = range(0, 5).map(n => new Star(resources.star.texture))
    this.actors = concat([this.player, this.enemy], this.stars)

    this.addBackground(resources)
    this.addBounds()
    this.addPlatforms(resources)
    this.addSprites(resources)

    const starMap = this.stars.reduce((result, star) => {
      result[star.id] = star
      return result
    }, {})

    // Add a collision handler.
    Events.on(this.engine, 'collisionStart', event => {
      const pairs = event.pairs

      pairs.forEach(collision => {
        const bodyA = collision.bodyA
        const bodyB = collision.bodyB
        if (bodyA.label === 'Player' && bodyB.label === 'Star') {
          this.removeStar(starMap[bodyB.id])
        } else if (bodyA.label === 'Star' && bodyB.label === 'Player') {
          this.removeStar(starMap[bodyA.id])
        }
      })
    })

    this.app.ticker.add(delta => {
      this.update(delta)
    })
  }

  addBounds () {
    const floor = Bodies.rectangle(WIDTH / 2, HEIGHT + (WALL_THICKNESS / 2), WIDTH, WALL_THICKNESS, {isStatic: true, label: 'Floor'})
    const ceiling = Bodies.rectangle(WIDTH / 2, -WALL_THICKNESS / 2, 480, WALL_THICKNESS, {isStatic: true, label: 'Ceiling'})
    const leftWall = Bodies.rectangle(-WALL_THICKNESS / 2, HEIGHT / 2, WALL_THICKNESS, HEIGHT, {isStatic: true, label: 'Wall'})
    const rightWall = Bodies.rectangle(WIDTH + (WALL_THICKNESS / 2), HEIGHT / 2, WALL_THICKNESS, HEIGHT, {isStatic: true, label: 'Wall'})
    World.add(this.engine.world, [floor, ceiling, leftWall, rightWall])
  }

  addBackground (resources) {
    const background = new Sprite(resources.background.texture)
    this.app.stage.addChild(background)
  }

  addPlatforms (resources) {
    const platform = new Platform({texture: resources.tiles.texture, x: 200, y: 200})
    this.app.stage.addChild(platform.sprite)
    World.add(this.engine.world, platform.body)
  }

  addSprites (resources) {
    this.actors.map(actor => this.app.stage.addChild(actor.sprite))
    World.add(this.engine.world, this.actors.map(actor => actor.body))
  }

  removeStar (star) {
    this.app.stage.removeChild(star.sprite)
    World.remove(this.engine.world, star.body)
  }

  setPlayerVelocity (vector) {
    this.player.setVelocity(vector)
  }

  update (delta) {
    Engine.update(this.engine, delta * 20)
    this.actors.map(actor => actor.update(delta))
  }
}
