function Timeline () {
  this._el = document.createElement('div')
  this._el.id = 'timeline'
  this._bar = document.createElement('div')
  this._bar.className = 'bar'
  this._events = document.createElement('div')
  this._events.className = 'events'

  this.install = function (host) {
    this._el.appendChild(this._bar)
    this._el.appendChild(this._events)
    host.appendChild(this._el)
  }

  this.start = function () {
    this.hide()
  }

  this.update = function () {
    let state = find_state()
    let ratio = clamp(state[0] / state[1], 0, 1)
    this._bar.style.width = `${ratio * 100}%`
  }

  function find_state () {
    if (markl.flow.active == 'splash') { return [0, Object.keys(markl.flow.screens).length] }
    if (markl.flow.active == 'fighter') { return [1, Object.keys(markl.flow.screens).length] }
    if (markl.flow.active == 'stage') { return [2, Object.keys(markl.flow.screens).length] }
    if (markl.flow.active == 'arena') { return [4, 4] }
  }

  this.update_events = function (index, history) {
    if (index >= history.length - 2) { return }
    // Events
    let events = this.find_events(index, history)

    let html = ''
    for (let id in events) {
      let event = events[id]
      let ratio = clamp(event.index / history.length, 0, 1)
      let perc = ratio * 100
      html += `<div class='event' style='left:${perc}%'></div>`
    }
    this._events.innerHTML = html
  }

  this.find_events = function (index, history) {
    let a = []
    for (let id in history) {
      if (parseInt(id) > index) { break }
      let state = history[id]
      if (state.action.indexOf('ATTACK') > -1) {
        a.push({ index: id, type: 'attack' })
      }
    }
    return a
  }

  function clamp (v, min, max) { return v < min ? min : v > max ? max : v }
}
