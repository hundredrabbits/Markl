var Pos = require('../units/pos.js')
var Vector = require('../units/vector.js')

function Missle(host,settings)
{
  this.name = "missle";
  this.pos = settings.pos;
  this.vector = settings.vector;
  this.life = settings.life;
  this.host = host;

  this.to_s = function()
  {
    return `${this.name}(${this.pos} ${this.vector})`
  }
}

module.exports = Missle;