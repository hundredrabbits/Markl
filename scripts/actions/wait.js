function WAIT()
{
  Action.call(this);

  this.name = "Wait";

  this.run = function()
  {
    console.log("waited..");
    setTimeout(function(){ markl.battle.turn(); }, ACT_SPEED/4);
  }
}