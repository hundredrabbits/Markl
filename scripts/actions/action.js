function Action()
{
  this.host = null;

  this.play = function()
  {
    setTimeout(function(){ markl.battle.turn(); }, 500);
  }
}