function Renderer()
{
  this.el = document.createElement('yu');
  this.el.id = "renderer";
  this.canvas = document.createElement('canvas');

  var STAGE = {padding:{x:15,y:15}}
  var TILE = {size:{w:20,h:20}}

  this.history = null;
  this.index = 0;

  this.install = function(host)
  {
    this.canvas.width = 400;
    this.canvas.height = 400;

    this.el.appendChild(this.canvas);
    host.appendChild(this.el);
  }

  this.play = function(history)
  {
    console.log("Play")
    this.index = 0;
    this.history = history;
    this.update();
  }

  this.next = function()
  {
    if(!this.history || this.index == this.history.length-1 ){ console.warn("No history, or at end"); return; }

    this.index += this.index <= this.history.length ? 1 : 0;
    this.update();
  }

  this.prev = function()
  {
    if(!this.history || this.index == 0){ console.warn("No history, or at beginning"); return; }

    this.index -= this.index >= 0 ? 1 : 0;
    this.update();
  }

  this.update = function()
  {
    if(!this.history){ console.warn("No history"); return; }

    console.log(`Update: Turn ${this.index}`);

    var state = this.history[this.index].state;
    this.clear();
    this.draw_ground();
    this.draw_players(state.players);
  }

  this.context = function()
  {
    return this.canvas.getContext('2d');
  }

  this.clear = function()
  {
    this.context().clearRect(0, 0, this.canvas.width, this.canvas.height);
  }

  this.draw_ground = function()
  {
    var x = 0;
    while(x < 5){
      var y = 0;
      while(y < 5){
        this.draw_rect({x:x * TILE.size.w,y:y * TILE.size.h,w:TILE.size.w,h:TILE.size.h});  
        y += 1;  
      }
      x += 1;
    }
  }

  this.draw_players = function(players)
  {
    for(id in players){
      this.draw_player(players[id]);
    }
  }

  this.draw_player = function(player)
  {
    var rect = {x:player.pos.x * TILE.size.w,y:player.pos.y * TILE.size.w,w:10,h:10,color:"red"};
    var ctx = this.context();
    ctx.fillStyle = player.id == 0 ? "green" : "red";
    ctx.fillRect(rect.x+0.5+STAGE.padding.x,rect.y+0.5+STAGE.padding.y,rect.w,rect.h);
  }

  this.draw_rect = function(rect)
  {
    var ctx = this.context();
    ctx.rect(rect.x+0.5+STAGE.padding.x,rect.y+0.5+STAGE.padding.y,rect.w,rect.h);
    ctx.stroke();
  }
}