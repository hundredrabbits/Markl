'use strict'

const SPEED = {
  camera: 50,
  turn: 250
}

const RENDER = {
  tile: { w: 30, h: 50 },
  viewport: { w: 720, h: 380 }
}

const INPUT = {
  up: 'up',
  down: 'down',
  left: 'left',
  right: 'right'
}

function Markl () {
  GameObject.call(this, 'markl', 'div')

  this.control = new Control(this)
  this.control.install(this.el)
  this.stage = new Stage(this)
  this.stage.install(this.el)

  this.offset = new Date().getTime()
  this.timer = null
  this.drawer = null

  this.setup = function () {
    this.el.style.width = `${RENDER.viewport.w}px`
    this.el.style.height = `${RENDER.viewport.h}px`
  }

  this.start = function () {
    console.log(this.id, 'Start')

    this.stage.start()
    this.control.start()

    this.timer = setInterval(() => { this.run() }, SPEED.turn)
    this.drawer = setInterval(() => { this.stage.camera.update() }, SPEED.camera)
  }

  this.stop = function () {
    clearInterval(this.timer)
  }

  this.run = function () {
    if (this.control.isPlaying !== true) { return }
    if (this.control.isPaused !== false) { return }

    this.offset = new Date().getTime()
    this.stage.run()
  }

  this.elapsed = function () {
    return new Date().getTime() - this.offset
  }
}
