function Animator(host, speed = 200, shuffle = true)
{
  this.host = host;
  var a = this;

  this.animations = {};
  this.index = shuffle ? parseInt(Math.random() * 300) : 0;

  this.add = function(animation)
  {
    this.animations[animation.name] = animation;
  }

  this.update = function()
  {
    var a = this.animations[this.host.status.action];
    if(!a){ console.log("missing",this.host.status.action); return; }
    var frame = a.frames[this.index % a.frames.length];
    if(!a.repeat && this.index >= a.frames.length){ this.host.sprite.style.display = "none"; return; }
    this.host.sprite.className = this.host.status.action+" "+this.host.status.vector+" f_"+frame;  
  }

  function on_time()
  {
    a.index += 1;
    a.update();
  }
  
  this.timer = setInterval(on_time, speed);
}