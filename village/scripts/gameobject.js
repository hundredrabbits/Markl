'use strict'

function GameObject (id) {
  this.id = id
  this.el = document.createElement('div')
  this.el.id = id

  this.install = function (host = document.body) {
    console.log(this.id, 'Install')
    host.appendChild(this.el)
  }

  this.start = function () {
    console.log(this.id, 'Start')
  }
}
