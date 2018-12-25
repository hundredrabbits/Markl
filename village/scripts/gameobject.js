'use strict'

function GameObject (id, type) {
  this.id = id

  if (type) {
    this.el = document.createElement(type)
    this.el.id = id
  }

  this.install = function (host = document.body) {
    console.log(this.id, 'Install')
    if (this.el) {
      host.appendChild(this.el)
    }
    this.setup()
  }

  this.setup = function () {
    console.log(this.id, 'Setup')
  }

  this.start = function () {
    console.log(this.id, 'Start')
  }

  // Dom

  this.setClass = function (c) {
    this.el.className = `${c.toLowerCase()}`
  }

  this.addClass = function (c) {
    if (!c || this.hasClass(c)) { return }

    this.el.className = `${this.el.className} ${c.toLowerCase()}`.trim()
  }

  this.removeClass = function (c) {
    if (!c || !this.hasClass(c)) { return }

    this.el.className = this.el.className.replace(c.toLowerCase(), '').trim()
  }

  this.hasClass = function (c) {
    if (!c) { return }

    return this.el.className.indexOf(c.toLowerCase()) > -1
  }
}
