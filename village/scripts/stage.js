'use strict'

function Stage () {
  GameObject.call(this, 'stage', 'canvas')

  this.setup = function()
  {
    this.el.width = 640
    this.el.height = 320
  }

  this.start = function () {
    console.log(this.id, 'Start')
  }
}
