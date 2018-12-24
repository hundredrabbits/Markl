'use strict'

function Control () {
  GameObject.call(this, 'control')

  this.index = 0
  this.stash = []
  this.isRecording = false
  this.isPlaying = false

  this.start = function () {
    console.log(this.id, 'Start')
    this.update()
  }

  this.update = function () {
    if (this.isPlaying === true) {
      this.el.innerHTML = `playing: ${this.index}/${this.stash.length}`
    } else if (this.isRecording === true) {
      this.el.innerHTML = `recording: ${this.stash.length} moves`
    } else {
      this.el.innerHTML = `Idle`
    }
  }

  this.clear = function () {
    this.stash = []
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
    this.stash.push(key)
    this.update()
  }

  this.onKeyDown = function (e) {
    if (e.key === 'Escape') {
      this.clear()
      return
    }
    if (e.key === 'Enter') {
      this.toggleRecord()
      return
    }
    if (this.isRecording === true) {
      if (e.key === 'ArrowUp' || e.key === 'ArrowDown' || e.key === 'ArrowLeft' || e.key === 'ArrowRight') {
        this.record(e.key)
        return
      }
      console.warn(`Unknown: ${e.key}`)
    }
  }

  this.onKeyUp = function (e) {
  }

  document.onkeydown = (e) => { this.onKeyDown(e) }
  document.onkeyup = (e) => { this.onKeyUp(e) }
}
