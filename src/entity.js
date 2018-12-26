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
      this.sprite.play()
    } else {
      this.sprite = new Pixi.Sprite(texture)
    }

    this.sprite.anchor.x = 0.5
    this.sprite.anchor.y = 0.5
    this.state = Entity.states.IDLE

    this.update()
  }

  get id () {
    return this.body.id
  }

  update (delta) {
    this.sprite.position = this.body.position
    this.sprite.rotation = this.body.angle
  }

  setVelocity (velocity) {
    Body.setVelocity(this.body, velocity)
  }
}
