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

    console.log("<Style>"+this.host.name+"("+this.name+")."+action.constructor.name);
    action.play();
    this.host.update();
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