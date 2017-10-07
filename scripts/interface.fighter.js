function Fighter_Interface(host)
{
  this.host = host;

  this.el = document.createElement("yu");

  this.label_el = document.createElement("text");
  this.el.appendChild(this.label_el);
  this.label_el.textContent = this.host.name;
  this.label_el.className = "label";

  this.progress_el = document.createElement("yu");
  this.progress_el.className = "progress";
  this.el.appendChild(this.progress_el);

  this.health_bar_el = document.createElement("yu");
  this.health_bar_el.className = "bar health";
  this.progress_el.appendChild(this.health_bar_el);

  // this.speed_bar_el = document.createElement("yu");
  // this.speed_bar_el.className = "bar speed";
  // this.progress_el.appendChild(this.speed_bar_el);


  this.update = function()
  {
    var min_stamina = 9999999;
    var max_stamina = 0;
    for(id in markl.fighters){
      if(markl.fighters[id].stamina < min_stamina){
        min_stamina = markl.fighters[id].stamina;
      }
      if(markl.fighters[id].stamina > max_stamina){
        max_stamina = markl.fighters[id].stamina;
      }
    }

    var stamina = this.host.stamina - min_stamina;
    var max = parseFloat(max_stamina - min_stamina);

    $(this.health_bar_el).animate({ width: ((this.host.hp/4.0) * 80) }, ACT_SPEED/4);
    this.label_el.textContent = this.host.name+" "+(stamina > 0 ? "+"+stamina : "");
  }
}