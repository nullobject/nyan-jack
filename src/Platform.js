import { Bodies } from 'matter-js'
import { Rectangle } from 'pixi.js'

import Entity from './Entity'

const BLOCK_WIDTH = 32
const BLOCK_HEIGHT = 32
const NUM_BLOCKS = 4

export default class Platform extends Entity {
  constructor ({ x, y, texture }) {
    const body = Bodies.rectangle(x, y, BLOCK_WIDTH * NUM_BLOCKS, BLOCK_HEIGHT, {
      isStatic: true,
      label: 'platform'
    })

    let subtexture = texture.clone()
    subtexture.frame = new Rectangle(256, 160, BLOCK_WIDTH * NUM_BLOCKS, BLOCK_HEIGHT)

    super({ body, texture: subtexture })
  }
}
