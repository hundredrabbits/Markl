function Fighter(id,name,pos)
{
  this.id = id
  this.name = name
  this.pos = pos

  this.style = "";

  this.type = "FIGHTER"
  this.character = "unknown"
  this.status = "idle"

  this.hp = 0; // Health Point
  this.sp = 0; // Stamina Point
  this.tp = 0; // Turn Point

  this.score = { hits:0, blocks:0 }
  this.reaction = null;
}

module.exports = Fighter;