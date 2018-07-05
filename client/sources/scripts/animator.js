function Animator(host)
{
  this.host = host;
  this.timer = null;
  this.frame = 0;

  this.start = function()
  {
    this.stop();
    this.frame = 0;
    this.timer = setInterval(() => { this.update(); },TIMING.frame);
  }

  this.update = function()
  {
    if(this.frame > 4){ this.stop(); }

    this.host.className = `frame${this.frame % 5}`;
    this.frame += 1;    
  }

  this.stop = function()
  {
    this.frame = 0;
    clearInterval(this.timer);
  }
}