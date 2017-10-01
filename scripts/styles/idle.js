function Idle()
{
  Style.call(this,"idle");

  this.on_sight = function()
  {
    return new WAIT();
  }

  this.on_default = function()
  {
    return new WAIT();
  }  
}