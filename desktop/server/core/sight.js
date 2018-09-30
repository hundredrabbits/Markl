'use strict';

// A shallow copy of an event

function Sight(event)
{
  this.id = event.id,
  this.name = event.name,
  this.pos = {x:event.pos.x,y:event.pos.y},
  this.style = event.style,
  this.type = event.type,
  this.character = event.character,
  this.status = event.status,
  this.hp =  event.hp,
  this.sp =  event.sp,
  this.tp =  event.tp

  this.make = function()
  {
    return {
      id:this.id,
      name:this.name,
      pos:{x:this.pos.x,y:this.pos.y},
      style:this.style,
      type:this.type,
      character:this.character,
      status:this.status,
      hp: this.hp,
      sp: this.sp,
      tp: this.tp
    }
  }
}

module.exports = Sight