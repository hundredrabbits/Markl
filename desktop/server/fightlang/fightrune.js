"use strict";

let Fightlang = require('./fightlang')

function Fightrune(parts = {trigger:null,event:null,condition:null,action:null})
{
  this.el = document.createElement('rune');
  this.el.className = "rune"
  
  this.trigger = parts.trigger
  this.event = parts.event
  this.condition = parts.condition
  this.action = parts.action
  this.name = new Fightlang().phonetic(parts)

  this.replace = function(rune)
  {
    this.trigger = rune.trigger;
    this.event = rune.event;
    this.condition = rune.condition;
    this.action = rune.action;
    this.update()
  }

  this.build = function(fragment)
  {
    this[fragment.type.toLowerCase()] = fragment.name;
    this.update();
  }

  this.clear = function()
  {
    this.trigger = null;
    this.event = null;
    this.condition = null;
    this.action = null;
    this.update()
  }

  this.update = function()
  {
    this.name = new Fightlang().phonetic(this);

    this.draw()
  }

  this.draw = function()
  { 
    let html = ""

    html += `<yu class='fragment trigger' style='background-image:url(media/runes/fragments/${this.trigger ? this.trigger.toLowerCase().replace(/ /g,'.') : 'blank'}.png)'></yu>`
    html += `<yu class='fragment event' style='background-image:url(media/runes/fragments/${this.event ? this.event.toLowerCase().replace(/ /g,'.') : 'blank'}.png)'></yu>` 
    html += `<yu class='fragment condition' style='background-image:url(media/runes/fragments/${this.condition ? this.condition.toLowerCase().replace(/ /g,'.') : 'blank'}.png)'></yu>` 
    html += `<yu class='fragment action' style='background-image:url(media/runes/fragments/${this.action ? this.action.toLowerCase().replace(/ /g,'.') : 'blank'}.png)'></yu>` 

    this.el.innerHTML = html
  }

  this.validate = function()
  {
    this.update()

    if(!this.trigger || !this.event || !this.condition || !this.action){ return false; }

    let lang = new Fightlang();

    if(lang.spec.TRIGGER.indexOf(this.trigger) < 0){
      console.warn("Unknown Trigger",this.trigger)
      return false;
    }
    if(lang.spec.EVENT.indexOf(this.event) < 0){
      console.warn("Unknown Event",this.trigger)
      return false;
    }
    if(lang.spec.CONDITION.indexOf(this.condition) < 0){
      console.warn("Unknown Condition",this.trigger)
      return false;
    }
    if(lang.spec.ACTION.indexOf(this.action) < 0){
      console.warn("Unknown Action",this.trigger)
      return false;
    }

    return true
  }

  this.fragments = function()
  {
    let a = []

    if(this.trigger){ a.push(this.trigger); }
    if(this.event){ a.push(this.event); }
    if(this.condition){ a.push(this.condition); }
    if(this.action){ a.push(this.action); }

    return a
  }

  this.render = function()
  {
    let html = ""

    if(this.trigger){ html += `<t class='trigger'>WHEN ${this.trigger}</t>` }
    if(this.event){ html += ` <t class='event'>IS ${this.event}</t> ` }
    if(this.condition){ html += `<t class='condition'>WITH ${this.condition}</t> ` }
    if(this.action){ html += `<t class='action'>THEN ${this.action}</t> ` }

    return html.trim()
  }

  this.copy = function()
  {
    return new Fightrune({trigger:this.trigger,event:this.event,condition:this.condition,action:this.action});
  }

  this.toString = function()
  {
    let html = ""

    if(this.trigger){ html += `WHEN ${this.trigger}` }
    if(this.event){ html += ` IS ${this.event} ` }
    if(this.condition){ html += `WITH ${this.condition} ` }
    if(this.action){ html += `THEN ${this.action} ` }

    return html.trim()
  }
}

function Fragment(type,name)
{
  this.type = type;
  this.name = name;
}

String.prototype.capitalize = function()
{
  return this.charAt(0).toUpperCase() + this.slice(1).toLowerCase();
}

module.exports = Fightrune

