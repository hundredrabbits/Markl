'use strict';

let Character = require('./character')

function Lancer(id,pos)
{
  Character.call(this,id,name,pos);

  this.name = "lancer"
  this.hp = 3;
}

module.exports = Lancer;