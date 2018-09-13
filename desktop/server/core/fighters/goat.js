"use strict";

let Fighter = require('../fighter.js')

function Goat(id,name,pos)
{
  Fighter.call(this,id,name,pos);

  this.character = "goat"
  this.hp = 3;
}

module.exports = Goat;