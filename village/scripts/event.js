'use strict'

function Event (id, pos = { x: 0, y: 0 }) {
  GameObject.call(this, 'event')

  this.pos = pos
  this.sprite = new Sprite(this)

  this.start = function () {
    console.log(this.id, 'Start')
    this.update()
  }

  this.run = function () {

  }
}
