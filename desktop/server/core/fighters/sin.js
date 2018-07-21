var Fighter = require('../fighter.js')

function Sin(id,name,pos)
{
  Fighter.call(this,id,name,pos);

  this.character = "sin"
  this.hp = 3;
}

module.exports = Sin;