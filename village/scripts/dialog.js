'use strict'

function Dialog (host) {
  GameObject.call(this, 'dialog', 'div')

  this.say = function (text) {
    this.el.innerHTML = text
  }
}
