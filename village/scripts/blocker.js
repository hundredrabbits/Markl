'use strict'

function Blocker (pos = { x: 0, y: 0 }) {
  Event.call(this, 'blocker', pos)

  this.sprite.color = 'green'
}
