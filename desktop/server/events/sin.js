'use strict';

const Fighter = require('./fighter')

function Sin(id,pos,fightscript)
{
  Fighter.call(this,id,pos,fightscript);

  this.name = "sin"
  this.hp = 3;
}

module.exports = Sin;