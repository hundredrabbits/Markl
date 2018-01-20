var Pos = require('./units/pos.js')
var Vector = require('./units/vector.js')

function Action(host,attr,target)
{
  this.host = host;
  this.attr = attr;
  this.target = target;
  this.cost = 1;

  this.run = function()
  {

  }

  this.end = function()
  {
    console.log(`${this.name} ENDED`)
  }
}

module.exports = Action;