"use strict";

function Editor()
{
  this.el = document.createElement('yu');
  this.el.id = "editor";
  this.el.className = "rune"

  // Menu

  this.menu = document.createElement('yu');
  this.menu.id = "menu";
  this.add_button = document.createElement('button')
  this.add_button.innerHTML = "<icon/>"
  this.add_button.className = "add"
  this.clear_button = document.createElement('button')
  this.clear_button.innerHTML = "<icon/>"
  this.clear_button.className = "clear"
  this.run_button = document.createElement('button')
  this.run_button.innerHTML = "<icon/>"
  this.run_button.className = "run"
  this.pause_button = document.createElement('button')
  this.pause_button.innerHTML = "<icon/>"
  this.pause_button.className = "pause"
  this.stop_button = document.createElement('button')
  this.stop_button.innerHTML = "<icon/>"
  this.stop_button.className = "stop"
  this.export_button = document.createElement('button')
  this.export_button.innerHTML = "<icon/>"
  this.export_button.className = "export"
  this.import_button = document.createElement('button')
  this.import_button.innerHTML = "<icon/>"
  this.import_button.className = "import"

  this.add_button.onclick = () => { this.rune_editor.merge(); }
  this.run_button.onclick = () => { this.run(); }
  this.pause_button.onclick = () => { this.pause(); }
  this.stop_button.onclick = () => { this.stop(); }
  this.clear_button.onclick = () => { this.rune_editor.clear(); }

  this.fightscript = new FightScript();

  this.status = document.createElement('t')
  this.status.id = "status"

  this.mode = "rune";
  this.is_paused = false;
  this.is_running = false;
  this.history = null;
  this.index = 0;
  this.timer = null;

  this.install = function(host)
  {
    this.el.appendChild(this.menu)
    this.menu.appendChild(this.run_button)
    this.menu.appendChild(this.pause_button)
    this.menu.appendChild(this.stop_button)
    this.menu.appendChild(this.import_button)
    this.menu.appendChild(this.export_button)
    this.menu.appendChild(this.add_button)
    this.menu.appendChild(this.clear_button)
    this.menu.appendChild(this.status)
    
    host.appendChild(this.el);

    this.update();
  }

  this.run = function()
  {
    console.info("Running");
    markl.scenario.reload()
    markl.scenario.inject_style(this.fightscript.render());
    markl.editor.history = markl.scenario.run();

    this.index = 0;
    this.is_paused = false;
    this.is_running = true;

    markl.renderer.update(this.history[this.index].state,this.history[this.index].reaction);
  }

  this.play = function(delay = 0)
  {
    console.info("Playing..");

    setTimeout(()=>{
      this.run();
    },TIMING.delayed_start/2);

    setTimeout(()=>{
      this.timer = setInterval(() => { this.next(); },TIMING.turn);
    },TIMING.delayed_start);
  }

  this.pause = function()
  {
    console.info("trying to pause");
    if(!this.is_running){ this.run();  }
    if(!this.history){ return; }
    if(this.is_paused){ return; }

    console.info("paused");

    this.is_paused = true;
    clearInterval(this.timer);
    markl.renderer.update(this.history[this.index].state);
  }

  this.resume = function()
  {
    console.info("resume");
    this.is_paused = false;
    this.timer = setInterval(() => { this.next(); },TIMING.turn);
    markl.renderer.update(this.history[this.index].state);
  }

  this.stop = function()
  {
    console.info("stop");
    this.is_paused = false;
    this.is_running = false;
    this.index = 0;
    clearInterval(this.timer);
    if(this.history){
      markl.renderer.update(this.history[this.index].state);  
    }
  }

  this.next = function()
  {
    if(!this.history || !this.history[this.index]){ console.warn("No history"); this.pause(); return; }
    if(this.index >= this.history.length-1){ console.warn("Reached the End"); this.pause(); return; }
    if(this.history[this.index].state.players[0].hp < 0){ console.warn("Player is dead"); this.pause(); return; }

    this.index += 1;

    // Skip Wait turns
    while(this.should_skip() == true && this.index < this.history.length-1){
      this.index += 1;
    }

    markl.renderer.update(this.history[this.index].state);
  }

  this.prev = function()
  {
    if(!this.history || !this.history[this.index]){ console.warn("No history"); this.pause(); return; }
    if(this.index < 1){ console.warn("Reached the beginning"); this.pause(); return; }
    if(this.history[this.index].state.players[0].hp < 0){ console.warn("Player is dead"); this.pause(); return; }

    this.index -= 1;

    // Skip Wait turns
    while(this.should_skip() == true && this.index > 0){
      this.index -= 1;
    }

    markl.renderer.update(this.history[this.index].state);
  }

  this.first = function()
  {
    if(!this.history || !this.history[this.index]){ console.warn("No history"); this.pause(); return; }

    this.index = 0;
    markl.renderer.update(this.history[this.index].state);
  }

  this.last = function()
  {
    if(!this.history || !this.history[this.index]){ console.warn("No history"); this.pause(); return; }

    this.index = this.history.length-1;
    markl.renderer.update(this.history[this.index].state);
  }

  this.replace = function(fightscript)
  {
    console.log("Replacing Fightscript")

    this.fightscript = fightscript;
    this.stop();
  }

  this.should_skip = function()
  {
    return this.history[this.index] && this.history[this.index-1] && this.history[this.index].action == "WAIT" && this.history[this.index-1].action == "WAIT" ? true : false;
  }

  this.validate = function()
  {
    let code = this.textbox.value
    let fightscript = new FightScript().parse(code)
    let is_valid = fightscript.validate();

    if(is_valid){
      this.fightscript.replace(this.textbox.value); 
      this.status.innerHTML = "Valid code!"
    }
    else{
      this.status.innerHTML = "Invalid code."
    }
  }

  this.select = function(name)
  {
    console.log("Select",name)
    this.mode = name;
    markl.editor.update();
  }

  this.toggle = function()
  {
    if(this.el.className.indexOf("hide") > -1){
      console.log("show")
      this.el.className = this.el.className.replace("hide","").trim();      
    }
    else{
      console.log("hide")
      this.el.className += " hide"
    }
  }

  this.update = function()
  {
    console.info(`===================== ${this.index}`)
    // Status 
    if(this.history && this.history.length > 0 && this.index > 0){
      let rune = new Rune(this.history[this.index].reaction)
      console.log(`Playing: Player ${this.history[this.index].player.id}`,rune.toString())
    }

    this.el.className = `${this.mode} ${this.is_running ? 'running' : ''}`
    
    let state = this.history && this.history.length > 0 && this.index > 0 ? this.history[this.index] : null;

    // Menu
    this.run_button.className = this.fightscript.runes().length < 1 ? "disabled run" : "run"

    this.update_status(state);
  }

  this.update_status = function(state)
  {
    let html = this.is_running ? "" : "Idle. "

    if(this.is_running && this.history && this.history.length > 0 && this.index > 0 && state){
      html += `${this.index}/${this.history.length} `
      html += `<t class='trigger'>${state.reaction.trigger}</t>(<t class='event'>${state.reaction.event}</t>).<t class='condition'>${state.reaction.condition}</t> `  
    }
  
    this.status.innerHTML = html
  }
}

