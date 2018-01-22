function Renderer()
{
  this.el = document.createElement('yu');
  this.el.id = "renderer";
  this.stage = document.createElement('stage');

  var STAGE = {padding:{x:15,y:15},tile:80}

  this.sprites = { players:{}, events:{} };

  this.install = function(host)
  {
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
    this.stage.style.top = `calc(50% - ${(5 * STAGE.tile)/2}px)`;
  }

  this.update = function(state)
  {
    if(!state){ return; }

    this.verify_sprites(state);
    this.update_sprites(state);

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
}