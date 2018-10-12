'use strict'

const Rune = require('./fightrune')
const Wait = require('../actions/wait')
const Fightlang = require('./fightlang')

function Fightscript (script = '') {
  this.host = null
  this.script = script.toUpperCase()
  this.style = parse(script)
  this.specs = new Fightlang()

  function parse (text) {
    const style = {}
    const lines = text.toUpperCase().split('\n')
    let trigger = null
    let event = null
    let condition = null
    let action = null
    for (let id in lines) {
      let pad = lines[id].search(/\S|$/)
      let line = lines[id].trim()
      if (line == '' || line.substr(0, 1) == '#') { continue }
      if (pad == 0) { trigger = line; style[line] = {} }
      if (pad == 2) { event = line; style[trigger][event] = {} }
      if (pad == 4) { condition = line; style[trigger][event][condition] = [] }
      if (pad == 6) { action = line; style[trigger][event][condition].push(line) }
    }
    return style
  }

  // Find Action in Triggers

  this.respond = function (triggers) {
    for (const trigger in this.style) {
      for (const event in this.style[trigger]) {
        for (const condition in this.style[trigger][event]) {
          const target = this.find(trigger, event, condition, triggers)
          if (target) {
            const actions = this.style[trigger][event][condition]
            return { target: target, trigger: trigger, event: event, condition: condition, actions: actions }
          }
        }
      }
    }
  }

  // Find target in triggers

  this.find = function (trigger, event, condition, h = this.style) {
    if (!h[trigger.toUpperCase()]) { return [] }
    if (!h[trigger.toUpperCase()][event.toUpperCase()]) { return [] }
    if (!h[trigger.toUpperCase()][event.toUpperCase()][condition.toUpperCase()]) { return [] }
    return h[trigger.toUpperCase()][event.toUpperCase()][condition.toUpperCase()]
  }

  this.react = function (triggers, combo = 0) {
    const response = this.respond(triggers)

    if (!response) { return }

    const actions = response.actions
    const target = response.target
    const act = actions[combo % actions.length].toLowerCase()
    const action_name = act.split(' ')[0].capitalize()
    const action_params = act.replace(action_name, '').trim()
    const action = this.specs.create(action_name)

    if (!action) { console.warn(`Unknown action: ${action_name}`); return }

    return { action: action, params: action_params, target: target }
  }

  // TODO: TO CLEAN v

  this.runes = function () {
    const a = []
    for (const trigger in this.style) {
      for (const event in this.style[trigger]) {
        for (const condition in this.style[trigger][event]) {
          for (const id in this.style[trigger][event][condition]) {
            const action = this.style[trigger][event][condition][id]
            a.push(new Fightrune({ trigger: trigger, event: event, condition: condition, action: action }))
          }
        }
      }
    }
    return a
  }

  this.render = function () {
    let text = ''
    for (const trigger in this.style) {
      text += `${trigger}\n`
      for (const event in this.style[trigger]) {
        text += `  ${event}\n`
        for (const condition in this.style[trigger][event]) {
          text += `    ${condition}\n`
          for (const id in this.style[trigger][event][condition]) {
            text += `      ${this.style[trigger][event][condition][id]}\n`
          }
        }
      }
    }
    return text
  }

  this.toString = function () {
    let text = ''
    for (const trigger in this.style) {
      text += trigger + ' '
      for (const event in this.style[trigger]) {
        text += event + ' '
        for (const condition in this.style[trigger][event]) {
          text += condition + ' '
          for (const id in this.style[trigger][event][condition]) {
            text += this.style[trigger][event][condition][id]
          }
        }
      }
    }
    return text.trim()
  }

  this.indexOf = function (target) {
    const runes = this.runes()
    for (const id in runes) {
      const rune = runes[id]
      if (rune.name == target.name) { return parseInt(id) }
    }
    return -1
  }

  this.copy = function () {
    const style = JSON.parse(JSON.stringify(this.style))
    return new FightScript(style)
  }

  this.validate = function () {
    const runes = this.runes()
    for (const id in runes) {
      const rune = runes[id]
      const is_valid = rune.validate()
      if (!is_valid) { return false }
    }
    return true
  }
}

module.exports = Fightscript
