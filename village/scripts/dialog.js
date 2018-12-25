'use strict'

function Dialog (host) {
  GameObject.call(this, 'dialog', 'div')

  this.say = function (text) {
    this.el.textContent = text
    this.update()
  }

  this.clear = function () {
    if (this.el.textContent === '') { return }
    this.el.textContent = ''
    this.update()
  }

  this.update = function () {
    if (this.el.textContent === '') { this.hide() } else { this.show() }
  }

  this.hide = function () {
    this.addClass('hidden')
  }

  this.show = function () {
    this.removeClass('hidden')
  }
}
