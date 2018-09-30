'use strict';

let Character = require('./character')

function Pest(id,pos)
{
  Character.call(this,id,pos);

  this.name = "pest"
  this.hp = 3;
}

module.exports = Pest;