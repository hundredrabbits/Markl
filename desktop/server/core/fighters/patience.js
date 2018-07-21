var Fighter = require('../fighter.js')

function Patience(id,name,pos)
{
  Fighter.call(this,id,name,pos);

  this.character = "patience"
  this.hp = 3;
}

module.exports = Patience;