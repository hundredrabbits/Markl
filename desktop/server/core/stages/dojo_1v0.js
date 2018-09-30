'use strict';

let Stage = require('./stage')
let Fighter = require('../fighters/fighter')
let Dummy = require('../fighters/dummy')

function Dojo1v0(c = [],f = [])
{
  Stage.call(this);

  this.bounds = {x:4,y:4};

  const s1 = new c[0](0,{x:0,y:0},new Fightscript(f[0]))
  const s2 = new Dummy(1,{x:0,y:4}, new Fightscript(""))

  this.fighters = [s1,s2];
}

module.exports = Dojo1v0