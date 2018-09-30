'use strict';

let Character = require('./character')

function Dummy(id,pos)
{
  Character.call(this,id,pos);

  this.name = "dummy"
  this.hp = 3;
}

module.exports = Dummy;