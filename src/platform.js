import { Bodies } from 'matter-js'
import { Rectangle } from 'pixi.js'

import Entity from './entity'

const BLOCK_WIDTH = 32
const BLOCK_HEIGHT = 32
const NUM_BLOCKS = 4

export default class Platform extends Entity {
  static label = 'platform'

  constructor ({ x, y, texture }) {
    let subtexture = texture.clone()
    subtexture.frame = new Rectangle(256, 160, BLOCK_WIDTH * NUM_BLOCKS, BLOCK_HEIGHT)
    let body = Bodies.rectangle(x, y, BLOCK_WIDTH * NUM_BLOCKS, BLOCK_HEIGHT, {
      isStatic: true,
      label: Platform.label
    })
    super({ body, texture: subtexture })
  }

  get extents () {
    return { x: this.body.bounds.min.x, y: this.body.bounds.max.x }
  }
}
