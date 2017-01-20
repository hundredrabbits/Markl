function Action()
{
  this.host = null;

  this.play = function()
  {
    this.host.stamina -= 1;
    setTimeout(function(){ markl.battle.turn(); }, 500);
  }
}