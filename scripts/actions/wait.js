function WAIT()
{
  Action.call(this);

  this.name = "Wait";

  this.run = function()
  {
    console.log("waited..");
  }
}