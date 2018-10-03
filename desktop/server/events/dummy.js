'use strict'

const Fighter = require('./fighter')

function Dummy (id, pos, fightscript) {
  Fighter.call(this, id, pos, fightscript)

  this.name = 'dummy'
  this.hp = 3
}

module.exports = Dummy
