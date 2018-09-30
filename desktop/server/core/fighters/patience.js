'use strict';

let Fighter = require('./fighter')

function Patience(id,pos,fightscript)
{
  Fighter.call(this,id,pos,fightscript);

  this.name = "patience"
  this.hp = 3;
}

module.exports = Patience;