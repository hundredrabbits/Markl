function Arena(name,size)
{
  this.name = name;
  this.size = size;
  this.spawns = [];

  this.element = document.createElement("div");
  this.element.setAttribute("class","arena");

  // Create Stage

  for (var x = 0; x < this.size.width; x++) {
    for (var y = 0; y < this.size.height; y++) {
      var tile = document.createElement("tile");
      tile.setAttribute("style","left:"+(x*50)+"px;top:"+(y*50)+"px");
      this.element.appendChild(tile);
    }
  }

  this.add_spawn = function(spawn)
  {
    this.spawns.push(spawn);
    this.element.appendChild(spawn.element);
  }
}