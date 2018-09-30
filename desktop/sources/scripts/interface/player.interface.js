'use strict';

function Player_UI(host)
{
  this.host = host;
  this.el = document.createElement('yu');
  this.el.className = `player ui player${host.id}`;
  this.monitor = new Monitor(this);
  this.name_el = document.createElement('t'); this.name_el.className = "name";

  this.el.appendChild(this.name_el);
  this.el.appendChild(this.monitor.el);

  this.name_el.textContent = host.name;

  this.update = function(h,speed_ranges)
  {
    let relative_speed = h.sp - speed_ranges.max;
    let sum_speed = speed_ranges.min - speed_ranges.max
    let actual_speed = (sum_speed - relative_speed) * -1
    let ratio_speed = actual_speed/-sum_speed;

    if(h.hp == 0){
      this.el.className = `player ui player${host.id} dead`;
    }
    this.monitor.update((h.hp/3)*100);
  }
}