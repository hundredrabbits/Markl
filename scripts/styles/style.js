function Style(name)
{
  this.name = name;
  this.host = null;

  this.act = function()
  {
    var action = this.on_default();

    if(action){
      this.render(action);
    }
    else{
      this.render(WAIT);
    }
  }

  this.render = function(action)
  {
    action.host = this.host;

    action.play();
    this.host.update();
    this.host.stamina -= 1;
  }

  // Triggers

  this.on_sight = function()
  {
    
  }

  this.on_attack = function()
  {
    
  }

  this.on_collision = function()
  {
    
  }

  this.on_default = function()
  {
    
  }
}