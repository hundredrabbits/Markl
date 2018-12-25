'use strict'

function Player (pos = { x: 0, y: 0, z: 0 }) {
  Event.call(this, 'player', pos)

  this.control = null // sent from stage

  this.last = { level: 'lobby', pos: { x: 0, y: 0 } }
  this.sprite.color = 'black'

  this.stats = {
    stamina: { val: 10, max: 10 },
    moves: { val: 0, max: 4 }
  }
  this.el = document.createElement('div')
  this.el.id = 'player'

  this.run = function () {
    // End
    if (this.control.stack.length < 1) {
      this.control.isPlaying = false
      this.pos.prev = this.pos
      return
    }

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

    this.stats.stamina.val--
  }

  this.update = function () {
    this.el.innerHTML = this._ui()
  }

  this.respawn = function () {
    this.stage.enter(this.last.level)
    this.moveTo(this.last.pos)
  }

  this._ui = function () {
    if (!this.stage) { return }

    let html = ''
    // Stats
    html += `stam:${this.stats.stamina.val}/${this.stats.stamina.max} moves:${this.stats.moves.val}/${this.stats.moves.max} `
    // Location
    html += `[${this.stage.level.name}::${this.stage.tileAt(this.pos)}] ${this.pos.x},${this.pos.y},${this.pos.z}(${this.pos.effect ? `${this.pos.effect.x},${this.pos.effect.y}` : ''})`
    return html
  }

  this.toString = function () {
    return ''
  }
}
