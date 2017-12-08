function Sprite()
{
  this.el = document.createElement("canvas")
  this.el.className = "sprite";

  this.context = function()
  {
    return this.el.getContext('2d');
  }

  this.clear = function()
  {
    this.context().clearRect(0, 0, this.el.offsetWidth * 2, this.el.offsetHeight * 2);
  }

  this.fill = function(color = "red")
  {
    var ctx = this.context();

    ctx.beginPath();
    ctx.globalCompositeOperation="source-over";
    ctx.moveTo(0,0);
    ctx.lineTo(this.el.offsetWidth,0);
    ctx.lineTo(this.el.offsetWidth,this.el.offsetHeight);
    ctx.lineTo(0,this.el.offsetHeight);
    ctx.lineTo(0,0);
    ctx.fillStyle = color;
    ctx.fill();
    ctx.closePath();
  }
}