function WAIT()
{
  Action.call(this);

  this.name = "Wait";

  this.run = function()
  {
    // this.host.stamina += 2;
    console.log("waited..");
    setTimeout(function(){ markl.battle.turn(); }, ACT_SPEED/4);
  }
}