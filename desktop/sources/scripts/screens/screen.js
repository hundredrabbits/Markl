'use strict'

function Screen (id) {
  this.id = id

  this.el = document.createElement('div')
  this.el.className = 'screen'
  this.el.id = `${id}_screen`

  this.install = function (host) {
    host.appendChild(this.el)
  }

  this.start = function () {
    this.hide()
  }

  this.update = function (host) {

  }

  this.reset = function () {

  }

  //

  this._create_el = function (category, name, type = 'div') {
    const _el = document.createElement(type)
    add_class(_el, category)
    if (name) {
      _el.id = `${category}_${name}`
    }
    return _el
  }
  //

  this.show = function () {
    add_class(this.el, 'shown')
    remove_class(this.el, 'hidden')
    remove_class(this.el, 'idle')
  }

  this.hide = function () {
    add_class(this.el, 'hidden')
    remove_class(this.el, 'shown')

    setTimeout(() => { this.idle() }, 1000)
  }

  this.idle = function () {
    add_class(this.el, 'idle')
    remove_class(this.el, 'shown')
    remove_class(this.el, 'hidden')
  }

  this.run = function () {
    console.log(`${this.id} -> Run`)
  }
}

// Helpers

function add_class (el, c) {
  if (has_class(el, c)) { return }
  el.className = `${el.className.trim()} ${c}`.replace(/ {2}/g, ' ').trim()
}

function remove_class (el, c) {
  if (!has_class(el, c)) { return }
  el.className = `${el.className.trim()}`.replace(c, '').trim()
}

function has_class (el, c) {
  if (el.className.indexOf(c) < 0) { return false }
  return true
}

module.exports = Screen
