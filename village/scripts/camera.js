'use strict'

function Camera (stage) {
  GameObject.call(this, 'camera')

  this.pos = { x: 0, y: 0 }
  this.target = { x: 0, y: 0 }
  this.viewport = {x:0,y:0}

  this.focus = function (target = stage.player.pos) {
    console.log('focus on:', target)
    this.target = posToPixel(target)
    this.update()
  }

  this.moveTo = function (target) {
    this.target = posToPixel(target)
    this.pos = posToPixel(target)
    this.update()
  }

  this.move = function (vector) {
    if (!vector) { return }
    this.target.x = this.pos.x - (vector.x * (TILE.w))
    this.target.y = this.pos.y + (vector.y * (TILE.h))
    this.update()
  }

  this.update = function () {
    this.pos.x += Math.floor((this.target.x - this.pos.x) / 5)
    this.pos.y += Math.floor((this.target.y - this.pos.y) / 5)

    this.viewport.x = (this.pos.x % (10 * TILE.w))
    this.viewport.y = (this.pos.y % (10 * TILE.h))
    markl.renderer.draw()
  }

  this.offset = function (pos) {
    return posToPixel(pos)
  }

  this.isFocused = function () {
    return true
    return Math.abs(this.pos.x - this.target.x) < 5 && Math.abs(this.pos.y - this.target.y) < 5
  }

  function posToPixel (pos) {
    const center = { x: (RENDER.size.w / 2) - (TILE.w / 2), y: (RENDER.size.h / 2) - (TILE.h / 2) }
    return { x: center.x - (pos.x * TILE.w), y: center.y + (pos.y * TILE.h) }
  }
}
