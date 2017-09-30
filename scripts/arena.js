function Arena(name,size, events = [])
{
  this.name = name;
  this.size = size;
  this.events = events;

  this.el = document.createElement("div");
  this.el.setAttribute("class","arena");
  $(this.el).css("height",(this.size.height * TILE_SIZE.width)+"px")

  // Create Stage

  this.start = function()
  {
    for (var x = 0; x < this.size.width; x++) {
      for (var y = 0; y < this.size.height; y++) {
        var tile = document.createElement("tile");
        tile.setAttribute("style","left:"+(x*TILE_SIZE.width)+"px;bottom:"+(y*TILE_SIZE.height)+"px");
        tile.innerHTML = x+","+y;
        this.el.appendChild(tile);
      }
    }

    // Walls
    for (var x = -1; x < this.size.width+1; x++) {
      this.add_event(new Wall(new Pos(x,-1)));
      this.add_event(new Wall(new Pos(x,this.size.height)));
    }
    for (var y = 0; y < this.size.height; y++) {
      this.add_event(new Wall(new Pos(-1,y)));
      this.add_event(new Wall(new Pos(this.size.width,y)));
    }

    markl.el.appendChild(this.el)
  }

  this.add_event = function(event)
  {
    this.events.push(event);
    this.el.appendChild(event.el);
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

    // Diagonals
    var tr = this.player_at(pos.add(new Pos(1,1)));
    var tl = this.player_at(pos.add(new Pos(-1,1)));
    var br = this.player_at(pos.add(new Pos(1,-1)));
    var bl = this.player_at(pos.add(new Pos(-1,-1)));

    if(tr){ seen.push(tr); }
    if(tl){ seen.push(tl); }
    if(br){ seen.push(br); }
    if(bl){ seen.push(bl); }

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