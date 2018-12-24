'use strict'

function GameObject (id, type = 'div') {
  this.id = id
  this.el = document.createElement(type)
  this.el.id = id

  this.install = function (host = document.body) {
    console.log(this.id, 'Install')
    host.appendChild(this.el)
    this.setup()
  }

  this.setup = function () {
    console.log(this.id, 'Setup')
  }

  this.start = function () {
    console.log(this.id, 'Start')
  }
}
