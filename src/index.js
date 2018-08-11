import * as Pixi from 'pixi.js'
import {Render} from 'matter-js'
import Game from './game'
import {range} from 'fkit'
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

let app = new Pixi.Application({
    width: 600,
    height: 600,
    antialiasing: true,
    transparent: false,
    resolution: 1
  }
)

document.body.appendChild(app.view)

// create an engine
const game = new Game()

// create a renderer
const renderer = Render.create({
  element: document.body,
  engine: game.engine,
  options: {
    wireframes: true
  }
})

// run the renderer
Render.run(renderer)

const NYAN_WIDTH = 60
const NYAN_HEIGHT = 42
const NYAN_SPRITES = 5

Pixi.loader
  .add('nyan', nyan)
  .add('star', star)
  .load((loader, resources) => {
    let textures = range(0, NYAN_SPRITES).map(n => {
      let texture = new Pixi.Texture(resources.nyan.texture)
      texture.frame = new Pixi.Rectangle(n * NYAN_WIDTH, 0, NYAN_WIDTH, NYAN_HEIGHT)
      return texture
    })

    let nyanSprite = new Pixi.extras.AnimatedSprite(textures)
    nyanSprite.anchor.x = 0.5
    nyanSprite.anchor.y = 0.5
    nyanSprite.animationSpeed = 0.25
    nyanSprite.play()

    app.stage.addChild(nyanSprite)

    let texture = new Pixi.Texture(resources.star.texture)
    let starSprite = new Pixi.Sprite(texture)
    starSprite.anchor.x = 0.5
    starSprite.anchor.y = 0.5

    app.stage.addChild(starSprite)

    app.ticker.add(delta => {
      nyanSprite.position = game.boxA.position
      nyanSprite.rotation = game.boxA.angle

      starSprite.position = game.boxB.position
      starSprite.rotation = game.boxB.angle
    })
  })
