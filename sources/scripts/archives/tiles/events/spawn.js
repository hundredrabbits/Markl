function Spawn(pos)
{
  Event.call(this,pos);

  this.is_collider = false;
  this.is_visible = false;

  this.fighter = null;
  this.type = "spawn";
  this.name = "Spawn";

  this.el.setAttribute("class","spawn");

  this.update = function()
  {
    console.log("??")
  }
}