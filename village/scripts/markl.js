'use strict'

const RENDER = {
  tile: { w: 60, h: 60 },
  viewport: { w: 640, h: 320 }
}

function Markl () {
  GameObject.call(this, 'markl', 'div')

  this.stage = new Stage()
  this.stage.install(this.el)
  this.control = new Control()
  this.control.install(this.el)

  this.start = function () {
    console.log(this.id, 'Start')

    this.stage.start()
    this.control.start()
  }
}
