'use strict'

function Stage () {
  GameObject.call(this, 'stage')

  this.start = function () {
    console.log(this.id, 'Start')
  }
}
