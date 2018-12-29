import { Engine } from 'matter-js'
import { copy, find, range } from 'fkit'

import Enemy from './Enemy'
import Platform from './Platform'
import Player from './Player'
import Star from './Star'
import World from './World'
import log from './log'

const collisionStartHandlers = [
  { a: 'player', b: 'star', run: (world, player, star) => world.removeEntity(star) },
  { a: 'enemy', b: 'platform', run: (world, enemy, platform) => enemy.walk(platform.extents) }
]

const collisionEndHandlers = [
  { a: 'player', b: 'platform', run: (world, player, platform) => player.idle() },
  { a: 'enemy', b: 'platform', run: (world, enemy, platform) => enemy.idle() }
]

function findAndApplyCollisionHandler (world, collision, handlers) {
  const bodyA = collision.bodyA
  const bodyB = collision.bodyB
  const handler = find(handler => handler.a === bodyA.label && handler.b === bodyB.label, handlers)
  return handler ? handler.run(world, world.entityMap[bodyA.id], world.entityMap[bodyB.id]) : world
}

function resolveCollisions (world, pairs) {
  pairs.collisionStart.forEach(collision => {
    findAndApplyCollisionHandler(world, collision, collisionStartHandlers)
  })

  pairs.collisionEnd.forEach(collision => {
    findAndApplyCollisionHandler(world, collision, collisionEndHandlers)
  })

  return world
}

export default class Game {
  constructor ({ width, height, app, resources }) {
    const engine = Engine.create()
    const player = new Player({ x: 400, y: 200, texture: resources.nyan.texture })
    const enemies = range(0, 2).map(n => new Enemy({ x: (200 * n) + 100, y: 100, texture: resources.bird.texture }))
    const stars = range(0, 5).map(n => new Star({ x: 100, y: 200, texture: resources.star.texture }))
    const platforms = range(0, 2).map(n => new Platform({ x: (200 * n) + 140, y: 200, texture: resources.tiles.texture }))

    let world = new World({
      width,
      height,
      app: app,
      engine: engine,
      resources
    })

    world = world
      .addEntity(player)
      .addEntities(enemies)
      .addEntities(stars)
      .addEntities(platforms)

    this.app = app
    this.engine = engine
    this.world = world
    this.player = player
  }

  jump () {
    log.debug('Game#jump')
    const player = this.player.jump()
    return copy(this, { player })
  }

  moveLeft () {
    log.debug('Game#moveLeft')
    const player = this.player.moveLeft()
    return copy(this, { player })
  }

  moveRight () {
    log.debug('Game#moveRight')
    const player = this.player.moveRight()
    return copy(this, { player })
  }

  update (delta) {
    Engine.update(this.engine, delta)
    let world = resolveCollisions(this.world, this.engine.pairs)
    world = world.update(delta)
    return copy(this, { world })
  }
}
