'use strict'

const Fighter = require('./fighter')

function Lancer (id, pos, fightscript) {
  Fighter.call(this, id, name, pos, fightscript)

  this.name = 'lancer'
  this.hp = 3
}

module.exports = Lancer
