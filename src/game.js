import * as Pixi from 'pixi.js'
import {Engine, World, Bodies} from 'matter-js'
import {range} from 'fkit'
import Sprite from './sprite'

const NYAN_WIDTH = 60
const NYAN_HEIGHT = 42
const NYAN_SPRITES = 5

export default class Game {
  constructor (resources) {
    this.engine = Engine.create()

    let textures = range(0, NYAN_SPRITES).map(n => {
      let texture = new Pixi.Texture(resources.nyan.texture)
      texture.frame = new Pixi.Rectangle(n * NYAN_WIDTH, 0, NYAN_WIDTH, NYAN_HEIGHT)
      return texture
    })
    this.player = new Sprite({x: 400, y: 200, width: 60, height: 42, textures: textures})

    let texture = new Pixi.Texture(resources.star.texture)
    this.star = new Sprite({x: 420, y: 50, width: 32, height: 32, texture: texture})

    const ground = Bodies.rectangle(400, 590, 800, 20, {isStatic: true})

    // add all of the bodies to the world
    World.add(this.engine.world, [this.player.body, this.star.body, ground])

    // run the engine
    Engine.run(this.engine)
  }
}
