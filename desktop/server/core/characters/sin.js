'use strict';

let Character = require('./character')

function Sin(id,pos,fightscript)
{
  Character.call(this,id,pos,fightscript);

  this.name = "sin"
  this.hp = 3;
}

module.exports = Sin;