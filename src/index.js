import * as Pixi from 'pixi.js'
import {Render} from 'matter-js'
import Game from './game'
import nyan from '../assets/images/nyan.png'
import star from '../assets/images/star.png'
// import React from 'react'
// import ReactDOM from 'react-dom'
// import RootView from './views/root_view'
// import log from './log'
// import nanobus from 'nanobus'

// const bus = nanobus()

// const state = {}

// const root = document.getElementById('root')

// ReactDOM.render(<RootView bus={bus} state={state} />, root)

const WIDTH = 800
const HEIGHT = 600

let app = new Pixi.Application({
    width: WIDTH,
    height: HEIGHT,
    antialiasing: true,
    transparent: false,
    resolution: 1
  }
)

document.body.appendChild(app.view)

const NYAN_WIDTH = 60
const NYAN_HEIGHT = 42
const NYAN_SPRITES = 5

Pixi.loader
  .add('nyan', nyan)
  .add('star', star)
  .load((loader, resources) => {
    // create an engine
    const game = new Game(resources)

    // create a renderer
    const renderer = Render.create({
      element: document.body,
      engine: game.engine,
      options: {
        wireframes: false
      }
    })

    // run the renderer
    Render.run(renderer)

    app.stage.addChild(game.player.sprite)
    app.stage.addChild(game.star.sprite)

    app.ticker.add(delta => {
      game.player.update(delta)
      game.star.update(delta)
    })

    setInterval(() => {
      game.player.jump()
    }, 2000)
  })
