function Spawn(pos)
{
  Event.call(this,pos);

  this.fighter = null;
  this.type = "spawn";

  this.el.setAttribute("class","spawn");

  // Sprite
  var e = document.createElementNS("http://www.w3.org/2000/svg", "svg");
  e.setAttribute("class","icon");

  var s = document.createElementNS("http://www.w3.org/2000/svg", "circle");
  s.setAttribute("cx",TILE_SIZE.width/2);
  s.setAttribute("cy",TILE_SIZE.height/2);
  s.setAttribute("r",TILE_SIZE.width * 0.3);

  e.appendChild(s);

  this.el.appendChild(e);
}