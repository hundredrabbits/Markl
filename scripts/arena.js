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

  this.get_players_visible_from = function(pos)
  {
    var seen = [];

    // Right
    for (var x = 1; x < 5; x++){
      var p = this.player_at(pos.add(new Pos(x,0)));
      var b = this.collider_at(pos.add(new Pos(x,0)));
      if(p){ seen.push(p); }
      if(b){ break; }
    }
    // Left
    for (var x = -1; x > -5; x--){
      var p = this.player_at(pos.add(new Pos(x,0)));
      var b = this.collider_at(pos.add(new Pos(x,0)));
      if(p){ seen.push(p); }
      if(b){ break; }
    }
    // Top
    for (var y = 1; y < 5; y++){
      var p = this.player_at(pos.add(new Pos(0,y)));
      var b = this.collider_at(pos.add(new Pos(0,y)));
      if(p){ seen.push(p); }
      if(b){ break; }
    }
    // Down
    for (var y = -1; y > -5; y--){
      var p = this.player_at(pos.add(new Pos(0,y)));
      var b = this.collider_at(pos.add(new Pos(0,y)));
      if(p){ seen.push(p); }
      if(b){ break; }
    }
    return seen;
  }

  this.collider_at = function(pos)
  {
    for (var i = this.events.length - 1; i >= 0; i--) {
      if(this.events[i].pos.is_equal(pos)){
        return this.events[i];
      }
    }
    return null;
  }

  this.player_at = function(pos)
  {
    for (var i = markl.players.length - 1; i >= 0; i--) {
      if(markl.players[i].is_alive() === true){
        if(markl.players[i].pos.x == pos.x && markl.players[i].pos.y == pos.y){ 
          return markl.players[i];
        }
      }
    }
    return null;
  }
}