'use strict';

let Character = require('./character')

function Patience(id,pos,fightscript)
{
  Character.call(this,id,pos,fightscript);

  this.name = "patience"
  this.hp = 3;
}

module.exports = Patience;