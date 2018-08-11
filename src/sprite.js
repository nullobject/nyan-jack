import * as Pixi from 'pixi.js'
import {Bodies, Body} from 'matter-js'

export default class Sprite {
  constructor ({x, y, width, height, texture, textures}) {
    this.body = Bodies.rectangle(x, y, width, height)

    if (textures) {
      this.sprite = new Pixi.extras.AnimatedSprite(textures)
      this.sprite.animationSpeed = 0.25
      this.sprite.play()
    } else {
      this.sprite = new Pixi.Sprite(texture)
    }

    this.sprite.anchor.x = 0.5
    this.sprite.anchor.y = 0.5
  }

  update (delta) {
    this.sprite.position = this.body.position
    this.sprite.rotation = this.body.angle
  }

  jump () {
    Body.setVelocity(this.body, {x: 0, y: -10})
  }
}
