'use strict';

let Character = require('./character')

function Sin(id,pos)
{
  Character.call(this,id,pos);

  this.name = "sin"
  this.hp = 3;
}

module.exports = Sin;