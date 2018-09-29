'use strict';

function Screen(id)
{
  this.id = id;

  this.el = document.createElement('div');
  this.el.className = "screen"
  this.el.id = `${id}_screen`;

  this.install = function(host)
  {
    host.appendChild(this.el);
  }

  this.start = function()
  {
    this.el.textContent = `${this.id}`;
    this.hide();
  }

  this.update = function(host)
  {

  }

  // 

  this.show = function()
  {
    this.el.className = "screen shown"
  }

  this.hide = function()
  {
    this.el.className = "screen hidden"
  }
}

module.exports = Screen