function Markl()
{
  this.el = document.createElement('yu');
  this.el.className = "screen";

  this.designer   = new Designer();
  this.renderer   = new Renderer();
  this.controller = new Controller();
  this.keyboard = new Keyboard();
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

    this.controller.add_role("default","Edit","undo");
    this.controller.add_role("default","Edit","redo");
    this.controller.add_role("default","Edit","cut");
    this.controller.add_role("default","Edit","copy");
    this.controller.add_role("default","Edit","paste");
    this.controller.add_role("default","Edit","delete");
    this.controller.add_role("default","Edit","selectall");
    
    this.controller.add("default","Designer","Play",() => { markl.designer.run(); },"Space");
    this.controller.add("default","Designer","Next Turn",() => { markl.designer.next(); },"Right");
    this.controller.add("default","Designer","Prev Turn",() => { markl.designer.prev(); },"Left");

    this.controller.commit();

    this.keyboard.add("ArrowRight",() => { markl.designer.next(); });
    this.keyboard.add("ArrowLeft",() => { markl.designer.prev(); });

    this.keyboard.install();
  }
  
  this.start = function()
  {
    this.scenario.load("garden");
    this.renderer.update();
  }
}