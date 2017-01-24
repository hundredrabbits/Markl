function WAIT()
{
  Action.call(this);

  this.play = function()
  {
    setTimeout(function(){ markl.battle.turn(); }, ACT_SPEED);
  }
}