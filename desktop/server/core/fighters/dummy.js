var Fighter = require('../fighter.js')

function Dummy(id,name,pos)
{
  Fighter.call(this,id,name,pos);

  this.character = "dummy"
  this.hp = 3;
}

module.exports = Dummy;