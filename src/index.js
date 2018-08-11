import * as Pixi from 'pixi.js'
import Game from './game'
import background from '../assets/images/background.png'
import nyan from '../assets/images/nyan.png'
import star from '../assets/images/star.png'
import {Render} from 'matter-js'
import {keyboard} from 'bulb'

const WIDTH = 480
const HEIGHT = 544

const UP = 38
const DOWN = 40
const LEFT = 37
const RIGHT = 39

let app = new Pixi.Application({
  width: WIDTH,
  height: HEIGHT,
  antialiasing: true,
  transparent: false,
  resolution: 1
})

document.body.appendChild(app.view)

Pixi.loader
  .add('background', background)
  .add('nyan', nyan)
  .add('star', star)
  .load((loader, resources) => {
    const game = new Game(app, resources)

    // XXX: Matterjs debug renderer.
    Render.run(Render.create({
      element: document.body,
      engine: game.engine,
      options: {
        wireframes: false
      }
    }))

    app.ticker.add(delta => {
      game.update(delta)
    })

    // setInterval(() => {
    //   game.player.jump()
    // }, 2000)

    keyboard.state(document).subscribe(state => {
      const vector = {x: 0, y: 0}

      if (state.includes(UP)) {
        vector.y = -10
      }

      if (state.includes(LEFT)) {
        vector.x = -2
      } else if (state.includes(RIGHT)) {
        vector.x = 2
      }

      game.player.setVelocity(vector)
    })
  })
