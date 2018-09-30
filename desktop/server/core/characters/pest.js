'use strict';

let Character = require('./character')

function Pest(id,pos,fightscript)
{
  Character.call(this,id,pos,fightscript);

  this.name = "pest"
  this.hp = 3;
}

module.exports = Pest;