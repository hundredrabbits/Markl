function Markl()
{
  this.el = document.createElement('yu');
  this.el.className = "screen";

  this.designer   = new Designer();
  this.renderer   = new Renderer();
  this.controller = new Controller();
  this.supervisor = require('../server/supervisor')
  this.scenario = require('../server/scenario')

  this.install = function()
  {
    document.body.appendChild(this.el);

    this.designer.install(this.el);
    this.renderer.install(this.el);

    this.controller.add("default","*","About",() => { require('electron').shell.openExternal('https://github.com/hundredrabbits/Dotgrid'); },"CmdOrCtrl+,");
    this.controller.add("default","*","Fullscreen",() => { app.toggle_fullscreen(); },"CmdOrCtrl+Enter");
    this.controller.add("default","*","Hide",() => { app.toggle_visible(); },"CmdOrCtrl+H");
    this.controller.add("default","*","Inspect",() => { app.inspect(); },"CmdOrCtrl+.");
    this.controller.add("default","*","Documentation",() => { markl.controller.docs(); },"CmdOrCtrl+Esc");
    this.controller.add("default","*","Reset",() => { markl.reset(); },"CmdOrCtrl+Backspace");
    this.controller.add("default","*","Quit",() => { app.exit(); },"CmdOrCtrl+Q");

    this.controller.add("default","Designer","Play",() => { markl.designer.run(); },"Space");
    this.controller.add("default","Designer","Next Turn",() => { markl.designer.next(); },"Right");
    this.controller.add("default","Designer","Prev Turn",() => { markl.designer.prev(); },"Left");

    this.controller.commit();
  }
  
  this.start = function()
  {
    this.scenario.load("garden");
    this.renderer.update();
  }
}