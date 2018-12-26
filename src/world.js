import Enemy from './enemy'
import Platform from './platform'
import Player from './player'
import Star from './star'
import * as Matter from 'matter-js'
import { Sprite } from 'pixi.js'
import { concat, range } from 'fkit'

const WALL_THICKNESS = 10

function addBackground (app, engine, background) {
  const sprite = new Sprite(background.texture)
  app.stage.addChild(sprite)
}

function addBounds (app, engine, width, height) {
  const floor = Matter.Bodies.rectangle(width / 2, height + (WALL_THICKNESS / 2), width, WALL_THICKNESS, { isStatic: true, label: 'floor' })
  const ceiling = Matter.Bodies.rectangle(width / 2, -WALL_THICKNESS / 2, 480, WALL_THICKNESS, { isStatic: true, label: 'ceiling' })
  const leftWall = Matter.Bodies.rectangle(-WALL_THICKNESS / 2, height / 2, WALL_THICKNESS, height, { isStatic: true, label: 'wall' })
  const rightWall = Matter.Bodies.rectangle(width + (WALL_THICKNESS / 2), height / 2, WALL_THICKNESS, height, { isStatic: true, label: 'wall' })
  Matter.World.add(engine.world, [floor, ceiling, leftWall, rightWall])
}

function addEntities (app, engine, entities) {
  entities.map(entity => app.stage.addChild(entity.sprite))
  Matter.World.add(engine.world, entities.map(entity => entity.body))
}

function removeStar (app, engine, star) {
  app.stage.removeChild(star.sprite)
  Matter.World.remove(engine.world, star.body)
}

export default class World {
  constructor ({ width, height, app, engine, resources }) {
    this.width = width
    this.height = height

    this.player = new Player(resources.nyan.texture)
    this.enemy = new Enemy(resources.bird.texture)
    this.stars = range(0, 5).map(n => new Star(resources.star.texture))
    this.platforms = range(0, 2).map(n => new Platform({ texture: resources.tiles.texture, x: (200 * n) + 140, y: 200 }))
    this.entities = concat([this.player, this.enemy], this.platforms, this.stars)

    const entityMap = this.entities.reduce((result, entity) => {
      result[entity.id] = entity
      return result
    }, {})

    addBackground(app, engine, resources.background)
    addBounds(app, engine, this.width, this.height)
    addEntities(app, engine, this.entities)

    Matter.Events.on(engine, 'collisionStart', event => {
      const pairs = event.pairs

      pairs.forEach(collision => {
        const bodyA = collision.bodyA
        const bodyB = collision.bodyB
        if (bodyA.label === Player.label && bodyB.label === Star.label) {
          removeStar(app, engine, entityMap[bodyB.id])
        } else if (bodyA.label === Star.label && bodyB.label === Player.label) {
          removeStar(app, engine, entityMap[bodyA.id])
        } else if (bodyA.label === Enemy.label && bodyB.label === Platform.label) {
          const enemy = entityMap[bodyA.id]
          enemy.walk()
        }
      })
    })

    Matter.Events.on(engine, 'collisionActive', event => {
      const pairs = event.pairs

      pairs.forEach(collision => {
        const bodyA = collision.bodyA
        const bodyB = collision.bodyB
        if (bodyA.label === Enemy.label && bodyB.label === Platform.label) {
          const enemy = entityMap[bodyA.id]
          const platform = entityMap[bodyB.id]
          if ((enemy.body.position.x >= platform.extents.y && enemy.dir > 0) || (enemy.body.position.x <= platform.extents.x && enemy.dir < 0)) {
            enemy.turnAround()
          }
        }
      })
    })
  }

  update (delta) {
    this.entities.map(entity => entity.update(delta))
  }
}
