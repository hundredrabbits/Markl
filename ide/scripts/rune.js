function Rune(characters = [])
{
  this.characters = characters;
  
  this.trigger = null;
  this.event = null;
  this.condition = null;
  this.action = null;

  this.build = function(depth,value)
  {
    this.characters[depth] = value;
    this.update();
  }

  this.update = function()
  {
    console.log(this.characters)
    this.trigger = this.characters[0] ? this.characters[0].toUpperCase() : null
    this.event = this.characters[1] ? this.characters[1].toUpperCase() : null
    this.condition = this.characters[2] ? this.characters[2].toUpperCase() : null
    this.action = this.characters[3] ? this.characters[3].toUpperCase() : null
  }

  this.is_complete = function()
  {
    return this.trigger && this.event && this.condition && this.action;
  }
}