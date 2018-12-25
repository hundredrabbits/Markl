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
    markl.stage.dialog.clear()
  }

  this.togglePause = function (force = false) {
    this.isPaused = force === true ? true : !this.isPlaying
  }

  this.record = function (key) {
    if (!key) { return }
    if (this.isRecording !== true) { return }
    if(this.stack.length >= markl.stage.player.stats.moves.max){ console.warn('No moves available.'); return }

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
    if (e.shiftKey) {
      markl.stage.camera.move(toVector(e.key))
    } else if (e.key === 'Escape') {
      this.clear()
    } else if (e.key === 'Enter') {
      this.toggleRecord()
    } else if (this.isRecording === true) {
      this.record(toInput(e.key))
    }
  }

  this.onKeyUp = function (e) {
  }

  this._ui = function()
  {
    if (this.isPaused === true) {
      return 'Paused'
    } else if (this.isPlaying === true) {
      return `Playing: [${this.stack.reduce((acc, el, key) => { return acc + ' ' + (key === this.index % this.stack.length ? '<b>' + el + '</b>' : el) }, '').trim()}]`
    } else if (this.isRecording === true) {
      if(this.stack.length > 0){
        return `Recording: Added ${this.stack[this.stack.length - 1]}, ${this.stack.length - markl.stage.player.stats.moves.max} moves left.`
      }
      else{
        return 'Starting to record..'
      }
    } 
    return `Idle(Press Enter to record)`

  }

  function toInput (key) {
    if (key === 'ArrowUp') { return INPUT.up }
    if (key === 'ArrowDown') { return INPUT.down }
    if (key === 'ArrowLeft') { return INPUT.left }
    if (key === 'ArrowRight') { return INPUT.right }
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
