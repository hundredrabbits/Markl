function WAIT()
{
  Action.call(this);

  this.name = "Wait";

  this.run = function()
  {
    this.host.status = "wait";
    console.log("waited..");
  }
}