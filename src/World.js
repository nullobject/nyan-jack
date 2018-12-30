import * as Matter from 'matter-js'
import { Sprite } from 'pixi.js'
import { copy, fold, omit, set } from 'fkit'

import { mapObject } from './util'

const WALL_THICKNESS = 10

function addBackground (app, engine, background) {
  const sprite = new Sprite(background.texture)
  app.stage.addChild(sprite)
}

function addBounds (app, engine, width, height) {
  const floor = Matter.Bodies.rectangle(width / 2, height + (WALL_THICKNESS / 2), width, WALL_THICKNESS, { isStatic: true, label: 'floor' })
  const ceiling = Matter.Bodies.rectangle(width / 2, -WALL_THICKNESS / 2, 480, WALL_THICKNESS, { friction: 0, isStatic: true, label: 'ceiling' })
  const leftWall = Matter.Bodies.rectangle(-WALL_THICKNESS / 2, height / 2, WALL_THICKNESS, height, { friction: 0, isStatic: true, label: 'wall' })
  const rightWall = Matter.Bodies.rectangle(width + (WALL_THICKNESS / 2), height / 2, WALL_THICKNESS, height, { friction: 0, isStatic: true, label: 'wall' })
  Matter.World.add(engine.world, [floor, ceiling, leftWall, rightWall])
}

export default class World {
  constructor ({ width, height, app, engine, resources }) {
    addBackground(app, engine, resources.background)
    addBounds(app, engine, width, height)

    this.app = app
    this.engine = engine
    this.entityMap = {}
  }

  addEntities (entities) {
    return fold((world, star) => world.addEntity(star), this, entities)
  }

  addEntity (entity) {
    this.app.stage.addChild(entity.sprite)
    Matter.World.add(this.engine.world, entity.body)
    const entityMap = set(entity.id, entity, this.entityMap)
    return copy(this, { entityMap })
  }

  removeEntity (entity) {
    this.app.stage.removeChild(entity.sprite)
    Matter.World.remove(this.engine.world, entity.body)
    const entityMap = omit([entity.id], this.entityMap)
    return copy(this, { entityMap })
  }

  update (delta) {
    const entityMap = mapObject(entity => entity.update(delta), this.entityMap)
    return copy(this, { entityMap })
  }
}
