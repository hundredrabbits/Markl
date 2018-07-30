function Markl()
{
  this.el = document.createElement('yu');
  this.el.className = "screen";

  this.editor     = new Editor();
  this.interface  = new Interface();
  this.renderer   = new Renderer();
  this.controller = new Controller();
  this.keyboard = new Keyboard();
  this.supervisor = require('../server/core/supervisor')
  this.scenario = require('../server/core/scenario')

  this.install = function()
  {
    document.body.appendChild(this.el);

    this.renderer.install(this.el);
    this.interface.install(this.el);
    this.editor.install(this.el);

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
    
    this.controller.add("default","Editor","Play",() => { markl.editor.run(); },"CmdOrCtrl+R");
    this.controller.add("default","Editor","Pause/Resume",() => { markl.editor.pause(); },"CmdOrCtrl+P");
    this.controller.add("default","Editor","Stop",() => { markl.editor.stop(); },"CmdOrCtrl+W");
    this.controller.add("default","Editor","Next Turn",() => { markl.editor.next(); },"CmdOrCtrl+Right");
    this.controller.add("default","Editor","Prev Turn",() => { markl.editor.prev(); },"CmdOrCtrl+Left");
    this.controller.add("default","Editor","Toggle View",() => { markl.editor.toggle(); },"CmdOrCtrl+D");
    this.controller.add("default","Editor","Save",() => { markl.editor.save(); },"CmdOrCtrl+S");
    this.controller.add("default","Editor","Export",() => { markl.editor.export(); },"CmdOrCtrl+E");

    this.controller.commit();

    this.keyboard.install();
  }
  
  this.start = function()
  {
    this.scenario.load("dojo");
    this.renderer.start();
  }

  this.reset = function()
  {
    this.editor.reset();
  }

  this.update = function()
  {
    this.el.className = `${this.editor.is_visible ? "designer_on" : "designer_off"}`;
  }
}