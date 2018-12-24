'use strict'

function Event () {
  GameObject.call(this, 'event')

  this.sprite = new Sprite()
  
  this.start = function () {
    console.log(this.id, 'Start')
    this.update()
  }
}
