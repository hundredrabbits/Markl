'use strict'

function Player (pos = { x: 0, y: 0, z: 0 }) {
  Event.call(this, 'player', pos)

  this.control = null // sent from stage

  this.last = { level: 'lobby', pos: { x: 0, y: 0 } }
  this.sprite.color = 'black'

  this.el = document.createElement('div')
  this.el.id = 'player'

  this.run = function () {
    if (this.control.stack.length < 1) { console.warn('Nothing to play..'); this.control.isPlaying = false; return }

    // Act
    const key = this.control.index % this.control.stack.length
    const cmd = this.act(this.control.stack[key])

    // onStep
    const tile = markl.stage.tileAt(this.pos)
    if (tile) {
      tile.onStep(this)
    }

    this.control.index++
  }

  this.act = function (cmd) {
    if (cmd === INPUT.up) {
      this.move({ x: 0, y: 1 })
    } else if (cmd === INPUT.down) {
      this.move({ x: 0, y: -1 })
    } else if (cmd === INPUT.left) {
      this.move({ x: -1, y: 0 })
    } else if (cmd === INPUT.right) {
      this.move({ x: 1, y: 0 })
    }
  }

  this.update = function () {
    if (!this.stage) { return }
    const tile = this.stage.tileAt(this.pos)
    let html = tile ? `${tile.id}` : this.pos.effect ? `${this.pos.effect.x},${this.pos.effect.y}` : ''
    this.el.innerHTML = `${html}[${this.stage.level.name}]`
  }

  this.respawn = function () {
    this.stage.enter(this.last.level)
    this.moveTo(this.last.pos)
  }

  this.toString = function () {
    return ''
  }
}
