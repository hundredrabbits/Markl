function Spawn(pos)
{
  Event.call(this,pos);

  this.player = null;

  this.element.setAttribute("class","spawn");

  // Sprite
  var e = document.createElementNS("http://www.w3.org/2000/svg", "svg");
  e.setAttribute("class","icon");

  var s = document.createElementNS("http://www.w3.org/2000/svg", "circle");
  s.setAttribute("cx","25");
  s.setAttribute("cy","25");
  s.setAttribute("r","10");
  s.setAttribute("stroke","black");
  s.setAttribute("fill","none");
  s.setAttribute("stroke-width","4");

  e.appendChild(s);

  this.element.appendChild(e);
}