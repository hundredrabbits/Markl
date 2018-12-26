'use strict'

function Control () {
  GameObject.call(this, 'control', 'div')

  this.index = 0
  this.stack = []
  this.isRecording = false
  this.isPlaying = false
  this.isPaused = false

  this.start = function () {
    console.log(this.id, 'Start')
    this.update()
  }

  this.update = function () {
    this.el.innerHTML = this._ui()
  }

  this.clear = function () {
    this.stack = []
    this.index = 0
    this.update()
  }

  this.toggleRecord = function (force = false) {
    this.isRecording = force === true ? true : !this.isRecording
    if (this.isRecording !== true) {
      this.togglePlay(true)
    }
    this.update()
  }

  this.togglePlay = function (force = false) {
    this.isPlaying = force === true ? true : !this.isPlaying
    this.index = 0
    markl.stage.dialog.clear()
  }

  this.togglePause = function (force = false) {
    this.isPaused = force === true ? true : !this.isPlaying
  }

  this.record = function (key) {
    if (!key) { return }
    if (this.isRecording !== true) { return }
    if (this.stack.length >= markl.stage.player.stats.moves.max) { console.warn('No moves available.'); return }

    console.log(`Recording: ${key}(${this.stack.length}/${markl.stage.player.stats.moves.max})`)

    markl.stage.camera.focus()
    this.isPlaying = false
    this.stack.push(key)
    this.update()
  }

  this.onKeyDown = function (e) {
    if (this.isPaused === true) {
      this.isPaused = false
      e.preventDefault()
      return
    }
    if (markl.stage.dialog.isActive() === true) {
      markl.stage.dialog.clear()
      e.preventDefault()
      return
    }

    if (e.key === '1') {
      markl.stage.enter('lobby', { x: 8, y: -4, z: 0 })
    }
    if (e.key === '2') {
      markl.stage.enter('forest', { x: 1, y: 0, z: 0 })
    }
    if (e.key === '3') {
      markl.stage.enter('sewers', { x: 1, y: 0, z: 0 })
    }

    if (e.shiftKey) {
      markl.stage.camera.move(toVector(e.key))
    } else if (e.key === 'Escape') {
      this.clear()
    } else if (e.key === 'Enter') {
      this.toggleRecord()
    } else if (this.isRecording === true) {
      this.record(toInput(e.key))
    }
    markl.stage.update()
  }

  this.onKeyUp = function (e) {
  }

  this._arrows = function () {
    const key = this.index % this.stack.length
    return `
    <div id='arrows'>
      <div class='arrow ${key === 0 && this.isPlaying === true ? 'active' : ''} icon_${markl.stage.player.stats.moves.max > 0 ? this.stack[0] + ' enabled' : 'disabled'} ${this.stack[0] ? 'used' : ''}'>${this.stack[0] ? toIcons(this.stack[0]) : ''}</div>
      <div class='arrow ${key === 1 && this.isPlaying === true ? 'active' : ''} icon_${markl.stage.player.stats.moves.max > 1 ? this.stack[1] + ' enabled' : 'disabled'} ${this.stack[1] ? 'used' : ''}'>${this.stack[1] ? toIcons(this.stack[1]) : ''}</div>
      <div class='arrow ${key === 2 && this.isPlaying === true ? 'active' : ''} icon_${markl.stage.player.stats.moves.max > 2 ? this.stack[2] + ' enabled' : 'disabled'} ${this.stack[2] ? 'used' : ''}'>${this.stack[2] ? toIcons(this.stack[2]) : ''}</div>
      <div class='arrow ${key === 3 && this.isPlaying === true ? 'active' : ''} icon_${markl.stage.player.stats.moves.max > 3 ? this.stack[3] + ' enabled' : 'disabled'} ${this.stack[3] ? 'used' : ''}'>${this.stack[3] ? toIcons(this.stack[3]) : ''}</div>
      <div class='arrow ${key === 4 && this.isPlaying === true ? 'active' : ''} icon_${markl.stage.player.stats.moves.max > 4 ? this.stack[4] + ' enabled' : 'disabled'} ${this.stack[4] ? 'used' : ''}'>${this.stack[4] ? toIcons(this.stack[4]) : ''}</div>
    </div>`
  }

  this._ui = function () {
    if (this.isPaused === true) {
      return 'Paused'
    } else if (this.isPlaying === true) {
      return `${this._arrows()}`
    } else if (this.isRecording === true) {
      if (this.stack.length > 0) {
        return `${this._arrows()}`
      } else {
        return 'Starting to record..'
      }
    }
    return `Idle(Press Enter to record)`
  }

  function toIcons (key) {
    if (key === INPUT.up) { return '↑' }
    if (key === INPUT.down) { return '↓' }
    if (key === INPUT.left) { return '←' }
    if (key === INPUT.right) { return '→' }
    return null
  }

  function toInput (key) {
    if (key === 'ArrowUp') { return INPUT.up }
    if (key === 'ArrowDown') { return INPUT.down }
    if (key === 'ArrowLeft') { return INPUT.left }
    if (key === 'ArrowRight') { return INPUT.right }
    if (key === ' ') { return INPUT.special }
    return null
  }

  function toVector (key) {
    if (key === 'ArrowUp') { return { x: 0, y: 1 } }
    if (key === 'ArrowDown') { return { x: 0, y: -1 } }
    if (key === 'ArrowLeft') { return { x: -1, y: 0 } }
    if (key === 'ArrowRight') { return { x: 1, y: 0 } }
    return null
  }

  document.onkeydown = (e) => { this.onKeyDown(e) }
  document.onkeyup = (e) => { this.onKeyUp(e) }
}
