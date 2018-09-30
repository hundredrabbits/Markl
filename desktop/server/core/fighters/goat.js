'use strict';

let Fighter = require('./fighter')

function Goat(id,pos,fightscript)
{
  Fighter.call(this,id,pos,fightscript);

  this.name = "goat"
  this.hp = 3;
}

module.exports = Goat;