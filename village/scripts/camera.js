'use strict'

function Camera (stage) {
  GameObject.call(this, 'camera')

  this.pos = { x: 0, y: 0 }
  this.target = { x: 0, y: 0 }

  this.focus = function (target) {
    this.target = posToPixel(target)
  }

  this.move = function (vector) {
    if (!vector) { return }
    this.target.x = this.pos.x + vector.x
    this.target.y = this.pos.y + vector.y
  }

  this.update = function () {
    this.pos.x += parseInt((this.target.x - this.pos.x) / 2)
    this.pos.y += parseInt((this.target.y - this.pos.y) / 2)
    stage.draw()
  }

  function posToPixel (pos) {
    const center = { x: (RENDER.viewport.w / 2) - (RENDER.tile.w / 2), y: (RENDER.viewport.h / 2) - (RENDER.tile.h / 2) }
    return { x: center.x - (pos.x * RENDER.tile.w), y: center.y + (pos.y * RENDER.tile.h) }
  }
}
