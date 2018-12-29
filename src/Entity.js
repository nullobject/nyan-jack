import * as Pixi from 'pixi.js'
import { Body } from 'matter-js'

export default class Entity {
  static states = {
    IDLE: 0,
    WALK: 1
  }

  constructor ({ body, texture, textures }) {
    this.body = body

    if (textures) {
      this.sprite = new Pixi.extras.AnimatedSprite(textures)
    } else {
      this.sprite = new Pixi.Sprite(texture)
    }

    this.sprite.anchor.x = 0.5
    this.sprite.anchor.y = 0.5
    this.state = Entity.states.IDLE
    this.dir = 1

    this.update()
  }

  get id () {
    return this.body.id
  }

  setVelocity (velocity) {
    Body.setVelocity(this.body, velocity)
    return this
  }

  applyForce (force) {
    Body.applyForce(this.body, { x: 0, y: 0 }, force)
    return this
  }

  update (delta) {
    this.sprite.scale.x = this.dir
    this.sprite.position = this.body.position
    this.sprite.rotation = this.body.angle
    return this
  }
}
