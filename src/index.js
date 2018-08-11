import * as Pixi from 'pixi.js'
import {Render} from 'matter-js'
import Game from './game'
import {range} from 'fkit'
import nyan from '../assets/images/nyan.png'
// import React from 'react'
// import ReactDOM from 'react-dom'
// import RootView from './views/root_view'
// import log from './log'
// import nanobus from 'nanobus'

// const bus = nanobus()

// const state = {}

// const root = document.getElementById('root')

// ReactDOM.render(<RootView bus={bus} state={state} />, root)

let app = new Pixi.Application({
    width: 640,
    height: 480,
    antialiasing: true,
    transparent: false,
    resolution: 1
  }
)

document.body.appendChild(app.view)

// // create an engine
// const game = new Game()

// create a renderer
// const renderer = Render.create({
//   element: document.body,
//   engine: game.engine,
//   options: {
//     wireframes: false
//   }
// })

// // run the renderer
// Render.run(renderer)

const NYAN_WIDTH = 60
const NYAN_HEIGHT = 42
const NYAN_SPRITES = 5

Pixi.loader
  .add('nyan', nyan)
  .load((loader, resources) => {
  let textures = range(0, NYAN_SPRITES).map(n => {
    let texture = new Pixi.Texture(resources.nyan.texture)
    texture.frame = new Pixi.Rectangle(n * NYAN_WIDTH, 0, NYAN_WIDTH, NYAN_HEIGHT)
    return texture
  })

  let sprite = new Pixi.extras.AnimatedSprite(textures)

  sprite.x = 32
  sprite.y = 32
  sprite.animationSpeed = 0.25
  sprite.play()

  app.stage.addChild(sprite)

  app.ticker.add(delta => tick(delta))
})

function tick (delta) {
}
