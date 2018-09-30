'use strict';

let Character = require('./character')

function Goat(id,pos)
{
  Character.call(this,id,pos);

  this.name = "goat"
  this.hp = 3;
}

module.exports = Goat;