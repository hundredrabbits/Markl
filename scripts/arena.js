function Arena(name,size)
{
  this.name = name;
  this.size = size;
  this.events = [];

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

  this.add_event = function(event)
  {
    this.events.push(event);
    this.element.appendChild(event.element);
  }

  this.update = function()
  {
    for (var i = this.events.length - 1; i >= 0; i--) {
      this.events[i].update();
    }
  }

  this.get_spawn = function()
  {
    for (var i = this.events.length - 1; i >= 0; i--) {
      if(this.events[i].constructor.name === Spawn.name && this.events[i].player == null){
        return this.events[i];
      }
    }
    return null;
  }

  this.get_players_alive = function()
  {
    var a = [];
    for (var i = markl.players.length - 1; i >= 0; i--) {
      if(markl.players[i].is_alive() === true){
        a.push(markl.players[i]);
      }
    }
    return a;
  }
}