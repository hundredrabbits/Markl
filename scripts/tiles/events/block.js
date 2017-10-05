function Block(pos)
{
  Event.call(this,pos);

  this.name = "Block";
  this.is_collider = true;
  this.type = "Blocker";

  this.start = function()
  {
    var target = document.getElementById("floor_"+pos.x+"_"+pos.y);
    if(!target){ console.log("?"); return; }
    target.style.display = "none";
  }
}