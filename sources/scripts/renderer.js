function Renderer()
{
  this.el = document.createElement('yu');
  this.el.id = "renderer";

  this.screens = {menu: new Menu_Screen(),character:new Character_Screen(), arena: new World_Screen(), stage: new Stage_Screen()};
  this.screen = null;
  this.animator = new Animator(this.el);

  this.install = function(host)
  {
    host.appendChild(this.el);
  }

  this.start = function()
  {
    // Display first view
    this.show(this.screens.stage);
  }

  this.show = function(screen)
  {
    this.screen = screen;
    this.screen.install(this.el)
  }

  this.update = function(state)
  {
    if(!this.screen){ return; }
    this.screen.update(state);
  }
}