'use strict'

function Event () {
  GameObject.call(this, 'event')

  this.pos = { x: 0, y: 0 }
  this.sprite = new Sprite(this)

  this.start = function () {
    console.log(this.id, 'Start')
    this.update()
  }
}
