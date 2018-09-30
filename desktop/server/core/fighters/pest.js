'use strict';

let Fighter = require('./fighter')

function Pest(id,pos,fightscript)
{
  Fighter.call(this,id,pos,fightscript);

  this.name = "pest"
  this.hp = 3;
}

module.exports = Pest;