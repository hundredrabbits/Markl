function Player(name)
{
  Event.call(this);
  this.name = name;

  // Interface
  
  this.interface = document.createElement("div");
  this.interface.setAttribute("class","player");
  this.interface.innerHTML = this.name;

  //
  this.element.setAttribute("class","player");

  // Sprite
  var e = document.createElementNS("http://www.w3.org/2000/svg", "svg");
  e.setAttribute("class","icon");

  var s = document.createElementNS("http://www.w3.org/2000/svg", "circle");
  s.setAttribute("cx","25");
  s.setAttribute("cy","25");
  s.setAttribute("r","15");
  s.setAttribute("fill","none");
  s.setAttribute("stroke","red");
  s.setAttribute("stroke-width","4");

  e.appendChild(s);

  this.element.appendChild(e);

  this.ready = function(spawn)
  {
    spawn.player = this;
    this.pos = spawn.pos;
    this.update();
  }

}