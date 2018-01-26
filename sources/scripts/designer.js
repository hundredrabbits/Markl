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

  this.resume_button = document.createElement('yu');
  this.resume_button.className = "resume button";
  this.resume_button.textContent = "Resume";

  this.pause_button = document.createElement('yu');
  this.pause_button.className = "pause button";
  this.pause_button.textContent = "Pause";

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

  this.is_visible = true;
  this.is_paused = false;
  this.is_playing = false;
  this.history = null;
  this.index = 0;
  this.timer = null;

  this.install = function(host)
  {
    this.el.appendChild(this.input_el);
    this.el.appendChild(this.hint_el);
    this.el.appendChild(this.controls_el);
    this.el.appendChild(this.reaction_el);

    this.load();

    this.controls_el.appendChild(this.run_button);
    this.controls_el.appendChild(this.pause_button);
    this.controls_el.appendChild(this.resume_button);
    this.controls_el.appendChild(this.stop_button);
    this.controls_el.appendChild(this.hide_button);
    this.controls_el.appendChild(this.turn_el);

    markl.designer.input_el.addEventListener('input', markl.designer.update);

    this.run_button.addEventListener('click', () => { markl.designer.run(); });
    this.pause_button.addEventListener('click', () => { markl.designer.pause(); });
    this.resume_button.addEventListener('click', () => { markl.designer.resume(); });
    this.stop_button.addEventListener('click', () => { markl.designer.stop(); });
    this.hide_button.addEventListener('click', () => { markl.designer.toggle(); });

    host.appendChild(this.el)
    this.input_el.addEventListener('keydown', () => { markl.designer.update(); });

    this.show();
  }

  this.on_change = function()
  {
    console.log("")
    markl.designer.update();
  }

  this.run = function()
  {
    markl.scenario.reload()
    markl.scenario.inject_style(markl.designer.input_el.value.toUpperCase());

    this.history = markl.scenario.run();
    this.index = 0;

    this.update();
    markl.renderer.update(this.history[this.index].state);

    this.stop();
    setTimeout(() => { this.start(); }, TIMING.delayed_start)
  }

  this.start = function()
  {
    this.is_paused = false;
    this.is_playing = true;
    this.timer = setInterval(() => { this.next(); },TIMING.turn);
  }

  this.pause = function()
  {
    if(this.is_paused){ this.resume(); return; }

    this.is_paused = true;
    clearInterval(this.timer);
    this.update();
    markl.renderer.update(this.history[this.index].state);
  }

  this.resume = function()
  {
    this.is_paused = false;
    this.timer = setInterval(() => { this.next(); },TIMING.turn);
    this.update();
    markl.renderer.update(this.history[this.index].state);
  }

  this.stop = function()
  {
    this.is_paused = false;
    this.is_playing = false;
    this.index = 0;
    clearInterval(this.timer);
    this.update();
    if(this.history){
      markl.renderer.update(this.history[this.index].state);  
    }
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

  this.toggle = function()
  {
    if(this.is_visible){
      this.hide();
    }
    else{
      this.show();
    }
  }

  this.show = function()
  {
    this.is_visible = true;
    markl.update();
  }

  this.hide = function()
  {
    this.is_visible = false;
    markl.update();
  }

  this.save = function()
  {
    console.log("Saved");

    localStorage.setItem("designer", this.input_el.value);
    this.update();
  }

  this.load = function()
  {
    this.input_el.value = localStorage.designer ? localStorage.designer : this.default();
    this.update();
  }

  this.reset = function()
  {
    this.input_el.value = this.blank();
    this.save();
    this.update();
  }

  this.default = function()
  {
    return require("../presets/default");
  }

  this.blank = function()
  {
    return require("../presets/blank");
  }

  this.update = function()
  {
    markl.designer.el.className = `${markl.designer.is_playing ? "playing" : ""} ${markl.designer.is_paused ? "paused" : ""}`;
    markl.designer.update_hint();

    if(markl.designer.history){
      markl.designer.turn_el.textContent = `${markl.designer.index}/${markl.designer.history.length}`;
      markl.designer.update_reaction();
    }
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
    var lines = this.input_el.value.split("\n");
    var html = "";
    for(id in lines){
      var line = lines[id];
      html += `${this.parse_hint_line(id,line)}`;
    }
    this.hint_el.innerHTML = html;
  }

  this.parse_hint_line = function(id,line)
  {
    var reaction = this.history && this.history[this.index].player.id == 0 ? this.history[this.index].reaction : null;
    var rune = " "

    if(line.substr(0,1) == "#"){
      rune = "#"
    }
    else if(line.substr(0,6) == "      "){
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
}