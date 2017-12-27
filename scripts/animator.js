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
    if(!a.repeat && this.index >= a.frames.length){ return; }
    // this.host.sprite.className = this.host.status.action+" "+this.host.status.vector+" f_"+frame;  
    if(this.host.sprite){
      // this.host.sprite.fill(this.index % 2 == 0 ? "blue" : "red");
      this.host.sprite.draw(frame,0);
    }
  }

  function on_time()
  {
    a.index += 1;
    a.update();
  }
  
  this.timer = setInterval(on_time, speed); // TODO
}