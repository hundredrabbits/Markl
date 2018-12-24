'use strict'

function Control () {
  GameObject.call(this, 'control')

  this.start = function () {
    console.log(this.id, 'Start')
  }
}
