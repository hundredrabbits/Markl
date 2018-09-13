"use strict";

let Fighter = require('../fighter.js')

function Pest(id,name,pos)
{
  Fighter.call(this,id,name,pos);

  this.character = "pest"
  this.hp = 3;
}

module.exports = Pest;