'use strict'

function Control () {
  GameObject.call(this, 'control', 'div')

  this.index = 0
  this.stack = []
  this.isRecording = false
  this.isPlaying = false

  this.start = function () {
    console.log(this.id, 'Start')
    this.update()
  }

  this.update = function () {
    if (this.isPlaying === true) {
      this.el.innerHTML = `playing: ${this.index % this.stack.length}/${this.stack.length} = ${this.stack[this.index % this.stack.length]}`
    } else if (this.isRecording === true) {
      this.el.innerHTML = this.stack.length > 0 ? `recording: ${this.stack[this.stack.length - 1]} ${this.stack.length} moves` : 'Starting to record..'
    } else {
      this.el.innerHTML = `Idle`
    }
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
  }

  this.record = function (key) {
    if (this.isRecording !== true) { return }

    console.log(`Recording: ${key}`)
    this.isPlaying = false
    this.stack.push(key)
    this.update()
  }

  this.onKeyDown = function (e) {
    if (e.key === 'Escape') {
      this.clear()
    } else if (e.key === 'Enter') {
      this.toggleRecord()
    } else if (this.isRecording === true) {
      if (e.key === 'ArrowUp') {
        this.record(INPUT.up)
      } else if (e.key === 'ArrowDown') {
        this.record(INPUT.down)
      } else if (e.key === 'ArrowLeft') {
        this.record(INPUT.left)
      } else if (e.key === 'ArrowRight') {
        this.record(INPUT.right)
      } else {
        console.warn(`Unknown: ${e.key}`)
      }
    }
  }

  this.onKeyUp = function (e) {
  }

  document.onkeydown = (e) => { this.onKeyDown(e) }
  document.onkeyup = (e) => { this.onKeyUp(e) }
}
