import { Application, loaders } from 'pixi.js'
import { Signal, keyboard, merge } from 'bulb'
import { values } from 'fkit'

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
  app.ticker.add(emit.next)
  return () => app.stop()
}).map(delta => ({ type: 'tick', delta }))

const commandSignal = keyboard
  .keys(document)
  .stateMachine((_, key, emit) => {
    if (key === UP) {
      emit.next('jump')
    } else if (key === DOWN) {
      emit.next('drop')
    } else if (key === LEFT) {
      emit.next('moveLeft')
    } else if (key === RIGHT) {
      emit.next('moveRight')
    }
  }).map(command => ({ type: command }))

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

    const subscription = merge(clockSignal, commandSignal)
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

function transformer (game, event) {
  if (event.type === 'tick') {
    game = game.update(event.delta * 10)
  } else {
    game = game[event.type]()
  }

  return game
}
