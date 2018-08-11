import {Application, Rectangle, Sprite, loader, utils} from 'pixi.js'
import {Render} from 'matter-js'
import Game from './game'
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

let app = new Application({
    width: 256,
    height: 256,
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

//load an image and run the `setup` function when it's done
loader
  .add(nyan)
  .load(setup)

function setup () {
  //Create the `tileset` sprite from the texture
  let texture = utils.TextureCache[nyan]

  //Create a rectangle object that defines the position and
  //size of the sub-image you want to extract from the texture
  let rectangle = new Rectangle(62, 0, 62, 42)

  //Tell the texture to use that rectangular section
  texture.frame = rectangle

  //Create the sprite from the texture
  let sprite = new Sprite(texture)

  //Position the sprite on the canvas
  sprite.x = 32
  sprite.y = 32

  //Optionally use `pivot` to move the sprite's x and y position
  /*
  rocket.pivot.set(32, 32)
  rocket.rotation = 0.3
  console.log(rocket.position)
  */

  //Add the rocket to the stage
  app.stage.addChild(sprite)
  app.ticker.add(delta => tick(delta))
}

function tick (delta) {
}
