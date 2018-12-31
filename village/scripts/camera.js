'use strict'

function Camera (stage) {
  GameObject.call(this, 'camera')

  this.pos = { x: 0, y: 0 }
  this.target = { x: 0, y: 0 }

  this.focus = function (target = stage.player.pos) {
    console.log('focus on:', target)
    this.target = posToPixel(target)
  }

  this.moveTo = function (target) {
    this.target = posToPixel(target)
    this.pos = posToPixel(target)
  }

  this.move = function (vector) {
    if (!vector) { return }
    this.target.x = this.pos.x - (vector.x * (RENDER.tile.w * 1))
    this.target.y = this.pos.y + (vector.y * (RENDER.tile.h * 1))
  }

  this.update = function () {
    this.pos.x += Math.floor((this.target.x - this.pos.x) / 5)
    this.pos.y += Math.floor((this.target.y - this.pos.y) / 5)
    markl.renderer.draw()
  }

  this.offset = function (pos) {
    return posToPixel(pos)
  }

  this.isFocused = function () {
    return Math.abs(this.pos.x - this.target.x) < 5 && Math.abs(this.pos.y - this.target.y) < 5
  }

  function posToPixel (pos) {
    const center = { x: (RENDER.viewport.w / 2) - (RENDER.tile.w / 2), y: (RENDER.viewport.h / 2) - (RENDER.tile.h / 2) }
    return { x: center.x - (pos.x * RENDER.tile.w), y: center.y + (pos.y * RENDER.tile.h) }
  }
}
