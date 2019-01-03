'use strict'

function Floor (style = 0) {
  Event.call(this, 'floor')

  this.sprite.color = '#f0f'
  this.sprite.asset = `level/garden/floor/${style}`
  this.sprite.offset = { x: 0, y: -0.5 * (this.pos.z+1) }


  this.align = function()
  {
    this.sprite.offset = { x: 0, y: -0.5 * (this.pos.z+1) }
  }

}
