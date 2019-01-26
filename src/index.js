import { Application, loaders } from 'pixi.js'
import { Signal } from 'bulb'
import { Keyboard } from 'bulb-input'
import { elem, values } from 'fkit'

import Game from './Game'
import background from '../assets/images/background.png'
import bird from '../assets/images/bird.png'
import log from './log'
import nyan from '../assets/images/nyan.png'
import star from '../assets/images/star.png'
import tiles from '../assets/images/tiles.png'

const WIDTH = 480
const HEIGHT = 544

const UP = 38
const DOWN = 40
const LEFT = 37
const RIGHT = 39

const app = new Application({
  width: WIDTH,
  height: HEIGHT,
  antialiasing: true,
  transparent: false,
  resolution: 1
})

const clockSignal = new Signal(emit => {
  app.ticker.add(emit.value)
  return () => app.stop()
})

const controlSignal = Keyboard
  .state(document)
  .startWith([])
  .map(convertKeyboardState)

// Sample the control signel at every clock tick.
const sampledControlSignal = controlSignal.sample(clockSignal)

const loader = new loaders.Loader()

loader
  .add('background', background)
  .add('bird', bird)
  .add('nyan', nyan)
  .add('star', star)
  .add('tiles', tiles)
  .load((loader, resources) => {
    const game = new Game({
      width: WIDTH,
      height: HEIGHT,
      app,
      resources
    })

    const subscription = Signal
      .zip(clockSignal, sampledControlSignal)
      .scan(transformer, game)
      .subscribe()

    document.body.appendChild(game.app.view)

    if (module.hot) {
      module.hot.dispose(() => {
        log.debug('disposing...')
        subscription.unsubscribe()
        app.destroy(true)
        values(resources).forEach(resource => resource.texture.destroy(true))
      })
    }
  })

/**
 * Converts the raw keyboard state into an input state.
 */
function convertKeyboardState (s) {
  return {
    up: elem(UP, s),
    down: elem(DOWN, s),
    left: elem(LEFT, s),
    right: elem(RIGHT, s)
  }
}

/**
 * Applies an event to yield a new state.
 */
function transformer (game, event) {
  const [delta, inputState] = event
  return game.update(delta * 10, inputState)
}
