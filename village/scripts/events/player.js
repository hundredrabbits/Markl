'use strict'

function Player (pos = { x: 0, y: 0, z: 0 }) {
  Event.call(this, 'player', pos)

  this.control = null // sent from stage

  this.last = { level: 'lobby', pos: { x: 0, y: 0, z: 0 } }
  this.sprite.color = 'black'
  this.sprite.asset = `character/lancer/default`
  this.sprite.offset = { x: 0, y: -0.5 }

  this.stats = {
    stamina: { val: 10, max: 10 },
    moves: { val: 0, max: 3 }
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
    if (this.stats.stamina.val < 1) {
      this.respawn()
    }

    // onStep
    const tile = markl.stage.eventAt({ x: this.pos.x, y: this.pos.y, z: this.pos.z - 1 })
    if (tile && markl.control.index > 0) {
      tile.onStep(this)
    }

    if (this.control.stack.length < 1) {
      return
    }

    // Act
    const key = this.control.index % this.control.stack.length
    const cmd = this.act(this.control.stack[key])

    this.control.index++
  }

  this.act = function (cmd) {
    if (!cmd) { return }
    if (cmd === INPUT.up) {
      this.move({ x: 0, y: 1 })
    } else if (cmd === INPUT.down) {
      this.move({ x: 0, y: -1 })
    } else if (cmd === INPUT.left) {
      this.move({ x: -1, y: 0 })
    } else if (cmd === INPUT.right) {
      this.move({ x: 1, y: 0 })
    } else if (cmd === INPUT.special) {
      this.special()
    } else {
      console.warn('unknown action', cmd)
    }

    this.stats.stamina.val--
  }

  this.special = function () {
    console.log('!!')
  }

  this.update = function () {
    this.el.innerHTML = this._ui()
  }

  this.respawn = function () {
    markl.control.clear()
    this.stage.enter(this.last.level, this.last.pos)
    this.moveTo(this.last.pos)
  }

  this._ui = function () {
    if (!this.stage) { return }

    let html = ''
    // Stats
    html += `stam:${this.stats.stamina.val}/${this.stats.stamina.max} moves:${this.stats.moves.max}max `
    // Location
    html += `[${this.stage.level.name}] ${this.pos.x},${this.pos.y},${this.pos.z}(${this.pos.effect ? `${this.pos.effect.x},${this.pos.effect.y}` : ''})`
    return html
  }

  this.toString = function () {
    return ''
  }
}
