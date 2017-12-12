function Sprite(host,src)
{
  this.host = host;
  this.el = document.createElement("canvas")
  this.el.className = "sprite";
  this.sheet = new Image(); this.sheet.src = src;
  this.sheet.onload = function(){ console.log("loaded asset",src); }

  this.context = function()
  {
    return this.el.getContext('2d');
  }

  this.clear = function()
  {
    this.context().clearRect(0, 0, this.el.offsetWidth * 2, this.el.offsetHeight * 2);
  }

  this.draw = function(x,y)
  {
    this.clear();
    var ctx = this.context();
    ctx.drawImage(this.sheet, x * 400, 0, 400, 400, 0, 0, 300, 150);
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

    this.draw();
  }
}