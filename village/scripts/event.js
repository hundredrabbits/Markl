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

  this.onStep = function (e) {

  }

  this.hasPos = function (pos) {
    return pos.x === this.pos.x && pos.y === this.pos.y
  }
}
