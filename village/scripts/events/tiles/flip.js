'use strict'

function Flip (effect = { x: 1, y: 1 }) {
  Event.call(this, 'flip')

  this.sprite.color = 'black'
  this.effect = effect
  this.sprite.asset = `level/garden/floor/flip`

  this.onStep = function (e) {
    if (!e.pos.effect) { e.pos.effect = { x: 1, y: 1 } }
    e.pos.effect.x *= this.effect.x
    e.pos.effect.y *= this.effect.y
  }
}
