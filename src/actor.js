import * as Pixi from 'pixi.js'
import {Body} from 'matter-js'

export default class Actor {
  constructor ({body, texture, textures}) {
    this.body = body

    if (textures) {
      this.sprite = new Pixi.extras.AnimatedSprite(textures)
      this.sprite.animationSpeed = 0.25
      this.sprite.play()
    } else {
      this.sprite = new Pixi.Sprite(texture)
    }

    this.sprite.anchor.x = 0.5
    this.sprite.anchor.y = 0.5

    this.update()
  }

  update (delta) {
    this.sprite.position = this.body.position
    this.sprite.rotation = this.body.angle
  }

  setVelocity (velocity) {
    Body.setVelocity(this.body, velocity)
  }
}