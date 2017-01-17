function Interface()
{
  this.element = document.createElement("div");
  this.element.setAttribute("id","interface");

  this.install = function()
  {
    markle.element.appendChild(this.element);
  }

  this.set_player = function(player)
  {
    this.element.appendChild(player.element);    
  }
}