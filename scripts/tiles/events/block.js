function Block(pos)
{
  Event.call(this,pos);

  this.name = "Block";
  this.is_collider = true;
  this.type = "Blocker";

  this.el.setAttribute("class","block");

  // Sprite
  var e = document.createElementNS("http://www.w3.org/2000/svg", "svg");
  e.setAttribute("class","icon");

  var s = document.createElementNS("http://www.w3.org/2000/svg", "rect");
  s.setAttribute("x",TILE_SIZE.width/4);
  s.setAttribute("y",TILE_SIZE.height/4);
  s.setAttribute("width",TILE_SIZE.width/2);
  s.setAttribute("height",TILE_SIZE.width/2);

  e.appendChild(s);

  this.el.appendChild(e);
}