function Fighter_Interface(host)
{
  this.host = host;

  this.el = document.createElement("ln");

  // Interface

  this.name_label = document.createElement("span");
  this.name_label.textContent = this.host.name;
  
  this.interface = document.createElement("div");
  this.interface.setAttribute("class","fighter");
  this.interface.innerHTML = this.host.name;

  //
  this.el.setAttribute("class","fighter");
  this.el.appendChild(this.name_label);

  this.update = function()
  {
    var html = "<b>"+this.host.name+"</b> ";

    // HP
    if(this.host.hp == 4){
      html += "||||";
    }
    if(this.host.hp == 3){
      html += "|||<span class='dmg'>|</span>";
    }
    if(this.host.hp == 2){
      html += "||<span class='dmg'>||</span>";
    }
    if(this.host.hp == 1){
      html += "|<span class='dmg'>|||</span>";
    }
    if(this.host.hp == 0){
      html += "<span class='dmg'>||||</span>";
    }

    // Max stamina

    if(markl.battle){
      var speed = this.host.stamina - markl.battle.next_fighter().stamina;
      // html += "SP:"+speed+" ";

      if(this.hp > 0){
        // html += " - "+this.host.status.action+(this.host.status.action ? "["+this.host.status.vector+"] " : "");
      }
    }
  
    this.el.innerHTML = html;
  }

}