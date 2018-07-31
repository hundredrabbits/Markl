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

  this.ref = `${this.type}:${this.name}:${this.id}`

  this.shallow = function()
  {
    return {}
  }

  this.serialize = function()
  {
    return {
      id:this.id,
      name:this.name,
      pos:this.pos,
      style:this.style,
      type:this.type,
      character:this.character,
      status:this.status,
      hp: this.hp,
      sp: this.sp,
      tp: this.tp,
      score: this.score
    }
  }
}

module.exports = Fighter;