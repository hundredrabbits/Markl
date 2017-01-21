function Idle()
{
  Style.call(this,"idle");

  this.on_default = function()
  {
    return new WAIT();
  }
}