function Player(name)
{
  this.name = name;

  // Interface
  
  this.element = document.createElement("div");
  this.element.setAttribute("class","player");
  this.element.innerHTML = this.name;

  this.update = function()
  {

  }
}