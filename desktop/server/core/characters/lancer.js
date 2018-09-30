'use strict';

let Character = require('./character')

function Lancer(id,pos,fightscript)
{
  Character.call(this,id,name,pos,fightscript);

  this.name = "lancer"
  this.hp = 3;
}

module.exports = Lancer;