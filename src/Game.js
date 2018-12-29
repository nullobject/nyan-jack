import { Engine } from 'matter-js'
import { copy, find, range } from 'fkit'

import Enemy from './Enemy'
import Platform from './Platform'
import Player from './Player'
import Star from './Star'
import World from './World'

const WIDTH = 480
const HEIGHT = 544

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
  constructor (app, resources) {
    this.app = app
    this.engine = Engine.create()

    const player = new Player({ x: 400, y: 200, texture: resources.nyan.texture })
    const enemy = new Enemy({ x: 300, y: 100, texture: resources.bird.texture })
    const stars = range(0, 5).map(n => new Star({ x: 100, y: 200, texture: resources.star.texture }))
    const platforms = range(0, 2).map(n => new Platform({ x: (200 * n) + 140, y: 200, texture: resources.tiles.texture }))

    let world = new World({
      width: WIDTH,
      height: HEIGHT,
      app: this.app,
      engine: this.engine,
      resources
    })

    world = world.addEntity(player)
    world = world.addEntity(enemy)
    world = stars.reduce((world, star) => world.addEntity(star), world)
    world = platforms.reduce((world, platform) => world.addEntity(platform), world)

    this.world = world
    this.player = player
  }

  jump () {
    const player = this.player.jump()
    return copy(this, { player })
  }

  moveLeft () {
    const player = this.player.moveLeft()
    return copy(this, { player })
  }

  moveRight () {
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
