function Renderer()
{
  this.el = document.createElement('yu');
  this.el.id = "renderer";
  this.stage = document.createElement('stage');
  this.background = document.createElement('background');

  var STAGE = {padding:{x:15,y:15},tile:80}

  this.sprites = { players:{}, events:{} };

  this.install = function(host)
  {
    this.stage.appendChild(this.background);
    this.el.appendChild(this.stage);
    host.appendChild(this.el);

    this.setup();
  }

  this.setup = function()
  {
    // Resize
    this.stage.style.width = `${5 * STAGE.tile}px`;
    this.stage.style.height = `${5 * STAGE.tile}px`;
    // Center
    this.stage.style.left = `calc(50% - ${(5 * STAGE.tile)/2}px)`;
    this.stage.style.top = `calc(55% - ${(5 * STAGE.tile)/2}px)`;
  }

  this.update = function(state)
  {
    if(!state){ return; }

    this.verify_sprites(state);
    this.update_sprites(state);
    this.focus(state);

    console.log(this.sprites)
  }

  this.verify_sprites = function(state)
  {
    for(id in state.players){
      var player = state.players[id];
      if(this.sprites.players[player.id]){ continue; }
      console.log("Creating sprite for ",player.id)
      var sprite = new Sprite("player",player.id)
      sprite.setup(player);
      this.sprites.players[player.id] = sprite;
      this.stage.appendChild(sprite.el);
    }
  }

  this.update_sprites = function(state)
  {
    for(id in this.sprites.players){
      var player = this.sprites.players[id];
      player.animate_to(state.players[id].pos);
    }
  }

  this.focus = function(state)
  {
    var positions = [];

    for(id in state.players){
      var player = state.players[id];
      if(player.hp < 1){ continue; }
      positions.push(player.pos);
    }

    var sum = {x:0,y:0};
    for(id in positions){
      sum.x += positions[id].x;
      sum.y += positions[id].y;
    }
    var stage_center = (STAGE.tile * 4)/2;
    var offset = {x:sum.x/positions.length,y:sum.y/positions.length}
    this.stage.style.marginLeft = `-${(offset.x * STAGE.tile) - stage_center}px`;
    this.stage.style.marginTop = `-${(offset.y * STAGE.tile) - stage_center}px`;
  }
}