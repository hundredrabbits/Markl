function Markl()
{
  this.el = document.createElement('yu');
  this.el.className = "screen";

  this.designer = new Designer();
  this.renderer = new Renderer();
  this.supervisor = require('./scripts/server/supervisor')

  this.install = function()
  {
    document.body.appendChild(this.el);

    this.designer.install(this.el);
    this.renderer.install(this.el);
  }
  
  this.start = function()
  {
    var state = require('./scripts/server/state')
    var result = this.supervisor.render(state);
    console.log(result);
    this.renderer.update();
  }
}