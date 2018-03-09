import {Render} from 'matter-js'
import Game from './game'
import React from 'react'
import ReactDOM from 'react-dom'
import RootView from './views/root_view'
import log from './log'
import nanobus from 'nanobus'

// const bus = nanobus()

// const state = {}

// const root = document.getElementById('root')

// ReactDOM.render(<RootView bus={bus} state={state} />, root)

// create an engine
const game = new Game()

// create a renderer
const render = Render.create({
  element: document.body,
  engine: game.engine
})

// run the renderer
Render.run(render)
