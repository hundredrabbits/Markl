function Rune(characters)
{
  this.characters = characters;

  this.trigger = this.characters[0].toUpperCase()
  this.event = this.characters[1].toUpperCase()
  this.condition = this.characters[2].toUpperCase()
  this.action = this.characters[3].toUpperCase()
}