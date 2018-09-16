"use strict";

function Markl()
{
  this.el = document.createElement('yu');
  this.el.className = "screen";

  this.navigator  = new Navigator();
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
    this.navigator.install(this.el);

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
    
    this.controller.add("default","Navigator","Play",() => { markl.navigator.play(); },"CmdOrCtrl+R");
    this.controller.add("default","Navigator","Pause/Resume",() => { markl.navigator.pause(); },"CmdOrCtrl+P");
    this.controller.add("default","Navigator","Stop",() => { markl.navigator.stop(); },"CmdOrCtrl+W");
    this.controller.add("default","Navigator","Next Turn",() => { markl.navigator.next(); },"CmdOrCtrl+Right");
    this.controller.add("default","Navigator","Prev Turn",() => { markl.navigator.prev(); },"CmdOrCtrl+Left");
    this.controller.add("default","Navigator","Last Turn",() => { markl.navigator.last(); },"CmdOrCtrl+Shift+Right");
    this.controller.add("default","Navigator","First Turn",() => { markl.navigator.first(); },"CmdOrCtrl+Shift+Left");
    this.controller.add("default","Navigator","Toggle View",() => { markl.navigator.toggle(); },"CmdOrCtrl+D");
    this.controller.add("default","Navigator","Save",() => { markl.navigator.save(); },"CmdOrCtrl+S");
    this.controller.add("default","Navigator","Export",() => { markl.navigator.export(); },"CmdOrCtrl+E");

    this.controller.commit();

    this.keyboard.install();
  }
  
  this.start = function()
  {
    this.scenario.load("garden");
    this.renderer.start();
  }

  this.reset = function()
  {
    this.navigator.reset();
  }

  this.update = function()
  {
    this.el.className = `${this.navigator.is_visible ? "designer_on" : "designer_off"}`;
  }
}