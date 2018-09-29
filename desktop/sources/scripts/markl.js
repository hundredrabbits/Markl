"use strict";

function Markl()
{
  this.el = document.createElement('div');
  this.el.id = "app";

  this.flow       = new Flow();
  this.navigator  = new Navigator();
  this.interface  = new Interface();
  this.controller = new Controller();
  this.keyboard   = new Keyboard();

  this.supervisor = require('../server/core/supervisor')
  this.scenario = require('../server/core/scenario')

  this.install = function(host)
  {
    console.log("Install");

    this.flow.install(this.el);
    this.interface.install(this.el);
    this.navigator.install(this.el);

    host.appendChild(this.el);

    this.keyboard.install();
  }
  
  this.start = function()
  {
    console.log("Start");

    this.flow.start();
    
    this.flow.goto("character");

    // this.scenario.load("garden");
  }

  this.reset = function()
  {
    this.navigator.reset();
  }

  this.update = function()
  {
    this.el.className = `${this.navigator.is_visible ? "designer_on" : "designer_off"}`;
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
      markl.navigator.load_path(file.path);
    }

    remove_class(markl.el,"dragover");
  });
}