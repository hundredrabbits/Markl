'use strict'

function Event (id, pos = { x: 0, y: 0, z: 0 }) {
  GameObject.call(this, id)

  this.stage = null // stage.addEvent

  this.pos = pos
  this.sprite = new Sprite(this)

  this.start = function () {
    console.log(this.id, 'Start')
    this.update()
  }

  this.run = function () {

  }

  this.move = function (pos) {
    const mod = this.mod(pos, this.effect)
    this.pos.x += mod.x
    this.pos.y += mod.y
  }

  this.mod = function (pos, effect = this.pos.effect) {
    if (!effect) { return pos }
    pos.x = pos.x * effect.x
    pos.y = pos.y * effect.y
    return pos
  }

  this.onStep = function (e) {

  }

  this.hasPos = function (pos) {
    return pos.x === this.pos.x && pos.y === this.pos.y
  }
}
