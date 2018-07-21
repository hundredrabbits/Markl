var Fighter = require('../fighter.js')

function Lancer(id,name,pos)
{
  Fighter.call(this,id,name,pos);

  this.character = "lancer"
  this.hp = 3;
}

module.exports = Lancer;