import Enemy from './enemy'
import Platform from './platform'
import Player from './player'
import Star from './star'
import * as Matter from 'matter-js'
import {Sprite} from 'pixi.js'
import {concat, range} from 'fkit'

const WALL_THICKNESS = 10

export default class World {
  constructor ({width, height, app, engine, resources}) {
    this.width = width
    this.height = height

    this.player = new Player(resources.nyan.texture)
    this.enemy = new Enemy(resources.bird.texture)
    this.stars = range(0, 5).map(n => new Star(resources.star.texture))
    this.entities = concat([this.player, this.enemy], this.stars)

    this.addBackground(app, engine, resources)
    this.addBounds(app, engine, resources)
    this.addPlatforms(app, engine, resources)
    this.addSprites(app, engine, resources)

    const starMap = this.stars.reduce((result, star) => {
      result[star.id] = star
      return result
    }, {})

    // Add a collision handler.
    Matter.Events.on(engine, 'collisionStart', event => {
      const pairs = event.pairs

      pairs.forEach(collision => {
        const bodyA = collision.bodyA
        const bodyB = collision.bodyB
        if (bodyA.label === 'Player' && bodyB.label === 'Star') {
          this.removeStar(app, starMap[bodyB.id])
        } else if (bodyA.label === 'Star' && bodyB.label === 'Player') {
          this.removeStar(app, starMap[bodyA.id])
        }
      })
    })
  }

  update (delta) {
    this.entities.map(entity => entity.update(delta))
  }

  addBounds (app, engine, resources) {
    const floor = Matter.Bodies.rectangle(this.width / 2, this.height + (WALL_THICKNESS / 2), this.width, WALL_THICKNESS, {isStatic: true, label: 'Floor'})
    const ceiling = Matter.Bodies.rectangle(this.width / 2, -WALL_THICKNESS / 2, 480, WALL_THICKNESS, {isStatic: true, label: 'Ceiling'})
    const leftWall = Matter.Bodies.rectangle(-WALL_THICKNESS / 2, this.height / 2, WALL_THICKNESS, this.height, {isStatic: true, label: 'Wall'})
    const rightWall = Matter.Bodies.rectangle(this.width + (WALL_THICKNESS / 2), this.height / 2, WALL_THICKNESS, this.height, {isStatic: true, label: 'Wall'})
    Matter.World.add(engine.world, [floor, ceiling, leftWall, rightWall])
  }

  addBackground (app, engine, resources) {
    const background = new Sprite(resources.background.texture)
    app.stage.addChild(background)
  }

  addPlatforms (app, engine, resources) {
    const platform = new Platform({texture: resources.tiles.texture, x: 200, y: 200})
    app.stage.addChild(platform.sprite)
    Matter.World.add(engine.world, platform.body)
  }

  addSprites (app, engine, resources) {
    this.entities.map(actor => app.stage.addChild(actor.sprite))
    Matter.World.add(engine.world, this.entities.map(actor => actor.body))
  }

  removeStar (app, engine, star) {
    app.stage.removeChild(star.sprite)
    Matter.World.remove(engine.world, star.body)
  }
}
