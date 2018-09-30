'use strict';

const Scenario = require('../server/core/scenario');

function Markl()
{
  this.el = document.createElement('div');
  this.el.id = "app";

  this.flow        = new Flow();
  this.interface   = new Interface();
  this.controller  = new Controller();
  this.keyboard    = new Keyboard();
 
  this.supervisor  = require('../server/core/supervisor')
  this.scenario    = null;

  this.install = function(host)
  {
    console.log("Install");

    this.flow.install(this.el);
    this.interface.install(this.el);

    this.keyboard.install();
    host.appendChild(this.el);
  }
  
  this.start = function()
  {
    console.log("Start");

    this.scenario = new Scenario();
    this.flow.start();

    this.flow.goto("character");
  }

  this.restart = function()
  {
    this.start();
  }

  this.reset = function()
  {
    this.navigator.reset();
  }

  this.update = function()
  {
    this.el.className = `${this.navigator.is_visible ? "designer_on" : "designer_off"}`;
  }

  this.run = function()
  {
    this.flow.run();
  }

  function add_class(el,c)
  {
    if(has_class(el,c)){ return; }
    el.className = `${el.className} ${c}`;
  }

  function remove_class(el,c)
  {
    if(!has_class(el,c)){ return; }
    el.className = `${el.className}`.replace(c,'').trim();
  }

  function has_class(el,c)
  {
    if(el.className.indexOf(c) < 0){ return false; }
    return true;
  }

  window.addEventListener('dragover',function(e)
  {
    e.stopPropagation();
    e.preventDefault();
    e.dataTransfer.dropEffect = 'copy';

    add_class(markl.el,"dragover");
  });

  window.addEventListener('drop', function(e)
  {
    e.stopPropagation();
    e.preventDefault();

    let files = e.dataTransfer.files;

    for(let id in files){
      let file = files[id];
      if(!file.path){ continue;}
      if(file.type && !file.type.match(/text.*/)) { console.log(`Skipped ${file.type} : ${file.path}`); continue; }
      markl.load_path(file.path);
    }

    remove_class(markl.el,"dragover");
  });

  // Options

  this.new = function()
  {
    console.log("New FightStyle")
  }

  this.open = function()
  {
    console.log("Open FightStyle")
  }

  this.load_path = function(path)
  {
    console.log(path)

    let data;
    try {
      data = fs.readFileSync(path, 'utf-8');
    } catch (err) {
      console.warn(`Could not load ${path}`);
      return;
    }
    markl.load(data);
  }

  this.load = function(script)
  {
    this.restart();
    this.scenario.set_script(script);
    this.run();
  }
}