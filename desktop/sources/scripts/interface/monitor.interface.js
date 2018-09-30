'use strict';

function Monitor(host, r = 15)
{
  this.host = host;
  this.r = r;

  this.el = document.createElementNS("http://www.w3.org/2000/svg", "svg");
  this.el.setAttribute("xmlns","http://www.w3.org/2000/svg");
  this.el.setAttribute("baseProfile","full");
  this.el.setAttribute("version","1.1");
  this.el.setAttribute('class', "monitor");

  this.bg = document.createElementNS("http://www.w3.org/2000/svg", "circle"); 
  this.fg = document.createElementNS("http://www.w3.org/2000/svg", "circle"); 
  this.bg.setAttribute('class', "bg")
  this.fg.setAttribute('class', "fg")

  this.bg.setAttribute("r",r)
  this.fg.setAttribute("r",r)
  this.bg.setAttribute("cx",r+5)
  this.fg.setAttribute("cx",r+5)
  this.bg.setAttribute("cy",r+5)
  this.fg.setAttribute("cy",r+5)

  this.el.appendChild(this.bg);
  this.el.appendChild(this.fg); 

  this.update = function(val = 50)
  {
    let c = Math.PI*(this.r*2);
    let pct = ((100-val)/100)*c;
    
    this.fg.setAttribute('stroke-dashoffset', pct)    
    this.fg.setAttribute('stroke-dasharray', c)
  }
}