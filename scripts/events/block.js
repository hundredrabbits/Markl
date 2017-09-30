function Block(pos)
{
  Event.call(this,pos);

  this.name = "Block";
  this.is_collider = true;

  this.el.setAttribute("class","block");

  // Sprite
  var e = document.createElementNS("http://www.w3.org/2000/svg", "svg");
  e.setAttribute("class","icon");

  var s = document.createElementNS("http://www.w3.org/2000/svg", "circle");
  s.setAttribute("cx",TILE_SIZE.width/2);
  s.setAttribute("cy",TILE_SIZE.height/2);
  s.setAttribute("r",TILE_SIZE.width/2);

  e.appendChild(s);

  this.el.appendChild(e);
}