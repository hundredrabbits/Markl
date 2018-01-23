function Designer()
{
  this.fighter = null;

  this.el = document.createElement('yu');
  this.el.id = "designer";
  this.input_el = document.createElement('textarea');
  this.hint_el = document.createElement('div');
  this.hint_el.className = "hint";

  this.controls_el = document.createElement('yu');
  this.controls_el.className = "controls";

  this.run_button = document.createElement('yu');
  this.run_button.className = "run button";
  this.run_button.textContent = "Run";

  this.stop_button = document.createElement('yu');
  this.stop_button.className = "stop button";
  this.stop_button.textContent = "Stop";

  this.hide_button = document.createElement('yu');
  this.hide_button.className = "hide button";
  this.hide_button.textContent = "Hide";

  this.turn_el = document.createElement('yu');
  this.turn_el.className = "turn";
  this.turn_el.textContent = "0/0";

  this.reaction_el = document.createElement('yu');
  this.reaction_el.className = "reaction";
  this.reaction_el.textContent = "--";

  this.is_running = false;
  this.history = null;
  this.index = 0;
  this.timer = null;

  this.install = function(host)
  {
    this.el.appendChild(this.input_el);
    this.el.appendChild(this.hint_el);
    this.el.appendChild(this.controls_el);
    this.el.appendChild(this.reaction_el);

    this.input_el.value = `SIGHT
  FIGHTER
    DISTANCE IS 4
      DASH TOWARD
    DISTANCE IS 3
      FIRE TOWARD
    DISTANCE IS 2
      DASH TOWARD
    DISTANCE IS 1
      ATTACK TOWARD
    DEFAULT
      MOVE TOWARD
  OBJECT
    DISTANCE IS 1
      ATTACK TOWARD
  PROJECTILE
    DEFAULT
      STEP
DEFAULT
  DEFAULT
    DEFAULT
      MOVE ANY`;

    this.controls_el.appendChild(this.run_button);
    this.controls_el.appendChild(this.stop_button);
    this.controls_el.appendChild(this.hide_button);
    this.controls_el.appendChild(this.turn_el);

    markl.designer.input_el.addEventListener('input', markl.designer.update);

    this.run_button.addEventListener('click', () => { markl.designer.run(); });
    this.stop_button.addEventListener('click', markl.designer.stop_button_click);
    this.hide_button.addEventListener('click', markl.designer.hide_button_click);

    host.appendChild(this.el)
  }

  this.run = function()
  {
    markl.scenario.reload()
    markl.scenario.inject_style(markl.designer.input_el.value);

    this.history = markl.scenario.run();
    this.index = 0;

    this.update();
    markl.renderer.update(this.history[this.index].state);

    setTimeout(() => { this.start(); }, 1000)
  }

  this.start = function()
  {
    this.timer = setInterval(() => { this.next(); },200);
  }

  this.stop = function()
  {
    this.index = 0;
    clearInterval(this.timer);
    this.update();
    markl.renderer.update(this.history[this.index].state);
  }

  this.next = function()
  {
    if(!this.history || this.index == this.history.length-1 ){ console.warn("No history, or at end"); this.stop(); return; }

    this.index += this.index <= this.history.length ? 1 : 0;
    this.update();
    markl.renderer.update(this.history[this.index].state);
  }

  this.prev = function()
  {
    if(!this.history || this.index == 0){ console.warn("No history, or at beginning"); return; }

    this.index -= this.index >= 0 ? 1 : 0;
    this.update();
    markl.renderer.update(this.history[this.index].state);
  }

  this.update = function()
  {
    this.turn_el.textContent = `${this.index}/${this.history.length}`;
    this.update_hint();
    this.update_reaction();
  }

  this.update_reaction = function()
  {
    var turn = this.history[this.index];
    var html = "";
    if(turn.player.id != 0){ this.reaction_el.innerHTML = ""; return; }

    html += `WHEN ${turn.reaction.trigger} ${turn.reaction.event} ${turn.reaction.condition} `;

    var action = turn.reaction.actions[0];
    var target = turn.reaction.target;

    if(target){
      html += `${target.name}{${target.pos ? target.pos.x : "?"},${target.pos ? target.pos.y : "?"}} `;
    }
    if(action){
      html += `${action.name} ${action.attr}[${action.line}] `;
    }
    this.reaction_el.innerHTML = html;
  }

  this.update_hint = function()
  {
    var turn = this.history[this.index];
    var lines = this.input_el.value.split("\n");
    var html = "";
    for(id in lines){
      var line = lines[id];
      html += `${this.parse_hint_line(id,line, turn.player.id == 0 ? turn.reaction : null)}`;
    }
    this.hint_el.innerHTML = html;
  }

  this.parse_hint_line = function(id,line,reaction = null)
  {
    var rune = " "
    if(line.substr(0,6) == "      "){
      rune = " "
    }
    else if(line.substr(0,4) == "    "){
      rune = " "
    }
    else if(line.substr(0,2) == "  "){
      rune = ">"
    }
    else if(line.substr(0,1) != " " && line.length > 2){
      rune = "-"
    }

    return `<line class='${reaction && reaction.actions && reaction.actions[0].line == id ? 'selected' : ""}'><span class='rune'>${rune}</span><span class='number'>${id}</span><span class='content'>${line}</span></line>`;
  }

  this.stop_button_click = function()
  {
  }

  this.hide_button_click = function()
  {
    console.log("!")
  }
}