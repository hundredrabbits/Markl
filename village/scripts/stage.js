'use strict'

function Stage (markl) {
  GameObject.call(this, 'stage')

  this.world = new World(this)
  this.camera = new Camera(this)
  this.dialog = new Dialog(this)

  this.player = new Player({ x: 0, y: 0, z: 0 })
  this.player.stage = this

  this.level = null

  this.setup = function () {
    this.player.control = markl.control
    this.player.install(markl.el)
    this.dialog.install(markl.el)

    this.focus = { x: RENDER.viewport.w / 2, y: RENDER.viewport.h / 2 }
  }

  this.start = function () {
    console.log(this.id, 'Start')
    this.enter('lobby', { x: 0, y: 0, z: 0 })
    this.camera.moveTo(this.player.pos)
    this.update()
  }

  this.run = function () {
    this.camera.focus(this.player.sprite.pos())
    for (const id in this.level.events) {
      if (!this.level.events[id]) { continue }
      this.level.events[id].run()
    }
    this.player.run()
    this.update()
  }

  this.update = function () {
    markl.control.update()
    this.dialog.update()
    this.player.update()
    markl.renderer.draw()
  }

  this.enter = function (id, pos = { x: 0, y: 0, z: 0 }) {
    if (!this.world.storage[id]) { console.warn(`Unknown level: ${id}`); return }
    console.info(this.id, `Entering ${id} ${pos.x},${pos.y}`)
    this.level = this.world.storage[id]
    this.level.start()

    this.player.moveTo(pos)
    this.camera.moveTo(pos)
  }

  this.undo = function () {
    console.log('undo')
  }

  this.tileAt = function (pos) {
    for (const id in this.level.events) {
      const event = this.level.events[id]
      if (event.pos.z !== -1) { continue }
      if (!event.hasPos(pos)) { continue }
      return event
    }
    return null
  }

  this.colliderAt = function (pos, z = 0, skip = null) {
    for (const id in this.level.events) {
      const event = this.level.events[id]
      if (event.pos.z !== z) { continue }
      if (event.id === skip.id) { continue }
      if (!event.hasPos(pos)) { continue }
      return event
    }
    return null
  }

  this.inBounds = function (pos) {
    return pos.x < this.level.size.w && pos.x >= 0 && -pos.y < this.level.size.h && -pos.y >= 0
  }
}
