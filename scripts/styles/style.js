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
  }

  this.render = function(action)
  {
    console.log(this.host.name+"("+this.name+")."+action.constructor.name);
    this.host.pos.add(action.move);
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