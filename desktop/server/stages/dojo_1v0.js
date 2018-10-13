'use strict'

const Fightscript = require('../fightlang/fightscript')
const Stage = require('./stage')
const Fighter = require('../events/fighter')
const Dummy = require('../events/dummy')

function Dojo1v0 (c = [], f = []) {
  Stage.call(this, 'dojo5x5')

  this.bounds = { x: 4, y: 4 }

  const s1 = new c[0](0, { x: 2, y: 4 }, new Fightscript(f[0]))
  const s2 = new Dummy(1, { x: 2, y: 0 }, new Fightscript(''))

  this.fighters = [s1, s2]
}

module.exports = Dojo1v0
