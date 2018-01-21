function Markl()
{
  this.el = document.createElement('yu');
  this.el.className = "screen";

  this.designer = new Designer();
  this.renderer = new Renderer();
  this.supervisor = require('../server/supervisor')
  this.scenario = require('../server/scenario')

  this.install = function()
  {
    document.body.appendChild(this.el);

    this.designer.install(this.el);
    this.renderer.install(this.el);
  }
  
  this.start = function()
  {
    this.scenario.load("garden");
    this.scenario.run();
    console.log(this.scenario.history);
    this.renderer.update();
  }
}