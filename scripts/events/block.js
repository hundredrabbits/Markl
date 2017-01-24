function Block(pos)
{
  Event.call(this,pos);

  this.is_collider = true;

  this.element.setAttribute("class","block");

  // Sprite
  var e = document.createElementNS("http://www.w3.org/2000/svg", "svg");
  e.setAttribute("class","icon");

  var s = document.createElementNS("http://www.w3.org/2000/svg", "circle");
  s.setAttribute("cx","25");
  s.setAttribute("cy","25");
  s.setAttribute("r","20");
  s.setAttribute("fill","grey");

  e.appendChild(s);

  this.element.appendChild(e);
}