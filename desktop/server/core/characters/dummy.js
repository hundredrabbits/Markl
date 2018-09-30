'use strict';

let Character = require('./character')

function Dummy(id,pos,fightscript)
{
  Character.call(this,id,pos,fightscript);

  this.name = "dummy"
  this.hp = 3;
}

module.exports = Dummy;