function Spawn(pos)
{
  Event.call(this,pos);

  this.is_collider = false;
  this.is_visible = false;

  this.fighter = null;
  this.type = "spawn";
  this.name = "Spawn";

  this.el.setAttribute("class","spawn");

  // Sprite
  var e = document.createElementNS("http://www.w3.org/2000/svg", "svg");
  e.setAttribute("class","icon");

  var s = document.createElementNS("http://www.w3.org/2000/svg", "circle");
  s.setAttribute("cx",TILE_SIZE.width/2);
  s.setAttribute("cy",TILE_SIZE.height/2);
  s.setAttribute("r",5);

  e.appendChild(s);

  this.el.appendChild(e);

  this.update = function()
  {
    console.log("??")
  }
}