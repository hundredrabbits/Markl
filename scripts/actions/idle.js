function IDLE(host,attr = null,target = null)
{
  Action.call(this,host,attr,target);

  this.name = "idle";
  this.cost = 10;

  this.name = "idle";

  this.run = function()
  {
    this.host.status = {action:this.name};
    this.host.stamina -= this.cost;

    console.log("Idle");
    this.host.update(); 
  }
}