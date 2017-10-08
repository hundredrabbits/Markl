function WAIT(host,attr = null,target = null)
{
  Action.call(this,host,attr,target);

  this.name = "wait";
  this.cost = 1;

  this.name = "wait";

  this.run = function()
  {
    this.host.status = {action:this.name};
    this.host.stamina -= this.cost;

    console.log("Wait");
    this.host.update(); 
  }
}