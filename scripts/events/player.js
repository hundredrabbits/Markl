function Player(name,style)
{
  Event.call(this);
  this.name = name;
  this.style = style;
  this.style.host = this;

  this.hp = 9;
  this.stamina = 9;

  // Interface
  
  this.interface = document.createElement("div");
  this.interface.setAttribute("class","player");
  this.interface.innerHTML = this.name;

  //
  this.element.setAttribute("class","player");

  this.ready = function(spawn)
  {
    spawn.player = this;
    this.pos = spawn.pos;
    this.update();
  }

  this.update = function()
  {
    if(this.pos){
      this.element.setAttribute("style","left:"+(this.pos.x*50)+"px;top:"+((50*4)-this.pos.y*50)+"px");  
    }
    this.interface.innerHTML = this.name+"("+this.hp+"/"+this.stamina+") - "+this.style.name;
  }

  this.act = function()
  {
    console.log("<Player>"+this.name+" Acting..");
    this.style.act();
  }

  this.is_alive = function()
  {
    return this.hp > 0 ? true : false;
  }
}