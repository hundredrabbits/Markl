function WAIT(host,attr = null,target = null)
{
  Action.call(this,host,attr,target);

  this.name = "wait";
  this.cost = 1;

  this.name = "Wait";

  this.run = function()
  {
    this.host.status = {action:this.name};
    this.host.stamina -= this.cost;

    this.host.update(); 
  }
}