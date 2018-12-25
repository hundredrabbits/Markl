'use strict'

function Level (name, size, events) {
  this.name = name
  this.size = size
  this.events = events

  this.start = function () {
    for (const id in this.events) {
      this.events[id].start()
    }
  }

  this.addEvent = function (event) {
    this.events.push(event)
  }
}
