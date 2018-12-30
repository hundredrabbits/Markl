'use strict'

function Floor (style = 0) {
  Event.call(this, 'floor')

  this.sprite.color = '#f0f'
  this.sprite.asset = `level/garden/floor/${style}`
}
