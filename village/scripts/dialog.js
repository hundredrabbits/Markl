'use strict'

function Dialog (host) {
  GameObject.call(this, 'dialog', 'div')

  this.say = function (text) {
    this.el.textContent = text
    this.update()
  }

  this.clear = function () {
    if (this.isActive() === false) { return }
    this.el.textContent = ''
    this.update()
  }

  this.update = function () {
    if (this.isActive()) { this.show() } else { this.hide() }
  }

  this.hide = function () {
    this.addClass('hidden')
  }

  this.show = function () {
    this.removeClass('hidden')
  }

  this.isActive = function () {
    return this.el.textContent !== ''
  }
}
