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
}
