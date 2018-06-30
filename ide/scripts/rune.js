function Rune(characters)
{
  this.characters = characters;

  this.trigger = this.characters[0]
  this.event = this.characters[1]
  this.condition = this.characters[2]
  this.action = this.characters[3]
}