var Pos = require('../../units/pos.js')
var Action = require('./action.js')

function FIRE(host,attr,target = null)
{
  Action.call(this,host,attr,target);

  this.name = "fire";
  this.cost = 20;

  this.name = "fire";

  this.run = function()
  {
    var offset = this.host.pos.offset(this.target.pos).invert();
    var vector = new Vector(offset.x,offset.y);
    this.host.status = {action:this.name,vector:vector.name};
    this.host.stamina -= this.cost;

    this.host.animator.index = 0;
    this.host.update();

    var target_position = new Pos(this.host.pos.x,this.host.pos.y).add(vector);

    var missile = new Missile(this.host.pos, vector);
    missile.start();
    missile.update()
    markl.arena.add_event(missile);
  }
}