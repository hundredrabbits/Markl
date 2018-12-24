'use strict'

const RENDER = {
  tile: { w: 60, h: 60 },
  viewport: { w: 640, h: 320 }
}

const INPUT = {
  up: 0,
  down: 1,
  left: 2,
  right: 3
}

function Markl () {
  GameObject.call(this, 'markl', 'div')

  this.control = new Control(this)
  this.control.install(this.el)
  this.stage = new Stage(this)
  this.stage.install(this.el)

  this.timer = null

  this.start = function () {
    console.log(this.id, 'Start')

    this.stage.start()
    this.control.start()

    this.timer = setInterval(() => { this.run() }, 500)
  }

  this.stop = function () {
    clearInterval(this.timer)
  }

  this.run = function () {
    if (this.control.isPlaying !== true) { return }

    this.stage.run()
  }
}
