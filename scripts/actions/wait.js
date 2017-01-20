function Wait()
{
  Action.call(this);

  this.play = function()
  {
    setTimeout(function(){ markl.battle.turn(); }, 100);
  }
}