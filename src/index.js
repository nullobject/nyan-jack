import * as Pixi from 'pixi.js'
import Game from './game'
import background from '../assets/images/background.png'
import bird from '../assets/images/bird.png'
import nyan from '../assets/images/nyan.png'
import star from '../assets/images/star.png'
import tiles from '../assets/images/tiles.png'
import {Render} from 'matter-js'
import {keyboard} from 'bulb'

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
    Render.run(Render.create({
      element: document.body,
      engine: game.engine,
      options: {
        wireframes: false
      }
    }))

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

      game.setPlayerVelocity(vector)
    })
  })
