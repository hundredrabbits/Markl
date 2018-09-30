'use strict';

let Character = require('./character')

function Patience(id,pos)
{
  Character.call(this,id,pos);

  this.name = "patience"
  this.hp = 3;
}

module.exports = Patience;