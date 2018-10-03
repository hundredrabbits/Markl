'use strict'

const Supervisor = require('./supervisor')

function Scenario () {
  this.script = null
  this.fighter = null
  this.stage = null
  this.level = 0

  this.set_script = function (script) {
    console.log('set_script')
    this.script = script
  }

  this.set_fighter = function (fighter) {
    console.log('set_fighter')
    this.fighter = fighter
  }

  this.set_stage = function (stage) {
    console.log('set_stage')
    this.stage = stage
  }

  this.render = function () {
    if (!this.script) { console.warn('Missing fightscript'); return }
    if (!this.fighter) { console.warn('Missing fighter'); return }
    if (!this.stage) { console.warn('Missing stage'); return }

    console.log('Rendering history')

    return Supervisor(this.script, this.fighter, this.stage)
  }
}

module.exports = Scenario
