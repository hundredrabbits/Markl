'use strict';

let Character = require('./character')

function Goat(id,pos,fightscript)
{
  Character.call(this,id,pos,fightscript);

  this.name = "goat"
  this.hp = 3;
}

module.exports = Goat;