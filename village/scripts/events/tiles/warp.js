'use strict'

function Warp (targetName, targetPos) {
  Event.call(this, 'warp')

  this.sprite.color = '#f00'
  this.sprite.asset = `level/garden/floor/warp`

  this.onStep = function (e) {
    console.log('stepping on warp')
    markl.stage.enter(targetName, targetPos)
  }

  this.toString = function () {
    return `to->${targetName}`
  }
}
