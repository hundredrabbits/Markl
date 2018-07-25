function Player_UI(id)
{
  this.el = document.createElement('yu');
  this.el.className = `player ui player${id}`;
  this.monitor = new Monitor(this);
  this.name_el = document.createElement('t'); this.name_el.className = "name";
  this.health_el = document.createElement('t'); this.health_el.className = "health";
  this.stamina_el = document.createElement('t'); this.stamina_el.className = "stamina";

  this.rune = new Rune({trigger:"SIGHT",event:"FIGHTER",condition:"DISTANCE OF 2",action:"ATTACK UP"})

  this.el.appendChild(this.name_el);
  this.el.appendChild(this.health_el);
  this.el.appendChild(this.stamina_el);
  this.el.appendChild(this.rune.el);

  this.el.appendChild(this.monitor.el);

  this.update = function(h,speed_ranges)
  {
    var relative_speed = h.sp - speed_ranges.max;
    var sum_speed = speed_ranges.min - speed_ranges.max
    var actual_speed = (sum_speed - relative_speed) * -1
    var ratio_speed = actual_speed/-sum_speed;

    this.name_el.textContent = h.name;
    this.health_el.textContent = h.hp+'HP';
    this.stamina_el.textContent = actual_speed+'SP'+(ratio_speed ? '('+ratio_speed.toFixed(2)+')' : '');
    this.rune.update();
    this.monitor.update((h.hp/3)*100);
  }
}