"use strict";

function Markl()
{
  this.el = document.createElement('div');
  this.el.id = "app";

  this.navigator  = new Navigator();
  this.interface  = new Interface();
  this.renderer   = new Renderer();
  this.controller = new Controller();
  this.keyboard = new Keyboard();
  this.project = new Project();

  this.supervisor = require('../server/core/supervisor')
  this.scenario = require('../server/core/scenario')

  this.install = function()
  {
    document.body.appendChild(this.el);

    this.renderer.install(this.el);
    this.interface.install(this.el);
    this.navigator.install(this.el);

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
      console.log(file);
    }

    remove_class(markl.el,"dragover");
  });
}