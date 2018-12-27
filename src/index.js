import * as Pixi from 'pixi.js'
import { Render } from 'matter-js'
import { keyboard } from 'bulb'

import Game from './game'
import background from '../assets/images/background.png'
import bird from '../assets/images/bird.png'
import nyan from '../assets/images/nyan.png'
import star from '../assets/images/star.png'
import tiles from '../assets/images/tiles.png'

const UP = 38
const DOWN = 40
const LEFT = 37
const RIGHT = 39

Pixi.loader
  .add('background', background)
  .add('bird', bird)
  .add('nyan', nyan)
  .add('star', star)
  .add('tiles', tiles)
  .load((loader, resources) => {
    const game = new Game(resources)
    document.body.appendChild(game.app.view)

    // XXX: Matterjs debug renderer.
    // Render.run(Render.create({
    //   element: document.body,
    //   engine: game.engine,
    //   options: {
    //     wireframes: false
    //   }
    // }))

    keyboard.state(document).subscribe(state => {
      if (state.includes(UP)) {
        game.applyForceToPlayer({ x: 0, y: -0.5 })
      }

      if (state.includes(LEFT)) {
        game.setPlayerVelocity({ x: -2, y: 0 })
      } else if (state.includes(RIGHT)) {
        game.setPlayerVelocity({ x: 2, y: 0 })
      }
    })
  })
