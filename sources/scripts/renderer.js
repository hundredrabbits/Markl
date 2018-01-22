function Renderer()
{
  this.el = document.createElement('yu');
  this.el.id = "renderer";

  var STAGE = {padding:{x:15,y:15}}
  var TILE = {size:{w:20,h:20}}

  this.canvas = document.createElement('canvas');

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
  }

  this.next = function()
  {
    console.log("Next turn")
  }

  this.prev = function()
  {
    console.log("Prev turn")
  }

  this.update = function()
  {
    this.clear();
    this.draw_ground();
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

  this.draw_rect = function(rect)
  {
    var ctx = this.context();
    ctx.rect(rect.x+0.5+STAGE.padding.x,rect.y+0.5+STAGE.padding.y,rect.w,rect.h);
    ctx.stroke();
  }
}