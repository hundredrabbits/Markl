'use strict'

function Assets (markl) {
  GameObject.call(this, 'assets', 'div')

  this.queue = []
  this.store = {}

  this.setup = function (queue) {
    this.queue = queue
    this.next()
  }

  this.next = function () {
    if (this.queue.length === 0) { console.log(this.id, `Loading complete.`); return markl.start() }

    this.store(this.queue.shift())
  }

  this.store = function (path) {
    console.log(this.id, `Storing ${path}`)
    const img = new Image()
    img.onload = () => {
      this.store[path] = img
      this.next()
    }
    img.src = `media/sprites/${path}.png`
  }

  this.get = function (path) {
    if (!this.store[path]) { console.warn(this.id, `Missing ${path}`) }
    return this.store[path]
  }
}
