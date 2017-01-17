function Block(pos)
{
  Event.call(this,pos);

  this.element.setAttribute("class","block");

  // Sprite
  var e = document.createElementNS("http://www.w3.org/2000/svg", "svg");
  e.setAttribute("class","icon");

  var s = document.createElementNS("http://www.w3.org/2000/svg", "circle");
  s.setAttribute("cx","25");
  s.setAttribute("cy","25");
  s.setAttribute("r","20");
  // s.setAttribute("stroke","black");
  s.setAttribute("fill","grey");
  // s.setAttribute("stroke-width","4");


  e.appendChild(s);

  this.element.appendChild(e);
}