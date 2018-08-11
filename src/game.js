import * as Pixi from 'pixi.js'
import {Engine, World, Bodies} from 'matter-js'
import Sprite from './sprite'
import Player from './player'

export default class Game {
  constructor (resources) {
    this.engine = Engine.create()

    this.player = new Player(resources.nyan.texture)

    let texture = new Pixi.Texture(resources.star.texture)
    this.star = new Sprite({x: 420, y: 50, width: 32, height: 32, texture: texture})

    const ground = Bodies.rectangle(400, 590, 800, 20, {isStatic: true})

    // add all of the bodies to the world
    World.add(this.engine.world, [this.player.body, this.star.body, ground])

    // run the engine
    Engine.run(this.engine)
  }
}
