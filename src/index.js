import * as Pixi from 'pixi.js'
import Game from './game'
import nyan from '../assets/images/nyan.png'
import star from '../assets/images/star.png'
import {Render} from 'matter-js'

const WIDTH = 800
const HEIGHT = 600

let app = new Pixi.Application({
  width: WIDTH,
  height: HEIGHT,
  antialiasing: true,
  transparent: false,
  resolution: 1
})

document.body.appendChild(app.view)

Pixi.loader
  .add('nyan', nyan)
  .add('star', star)
  .load((loader, resources) => {
    const game = new Game(app, resources)

    const renderer = Render.create({
      element: document.body,
      engine: game.engine,
      options: {
        wireframes: false
      }
    })

    Render.run(renderer)

    app.ticker.add(delta => {
      game.update(delta)
    })

    setInterval(() => {
      game.player.jump()
    }, 2000)
  })
