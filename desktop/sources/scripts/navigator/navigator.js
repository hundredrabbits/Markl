"use strict";

function Navigator()
{
  this.fightscript = new FightScript();
  this.timeline = new Timeline();

  this.el = document.createElement('yu');
  this.el.id = "navigator";
  this.el.className = "rune"

  // Menu

  this.run_button = document.createElement('button')
  this.run_button.className = "run"
  this.run_button.onclick = () => { this.toggle(); }

  this.is_paused = false;
  this.is_running = false;
  this.history = null;
  this.index = 0;
  this.timer = null;

  this.install = function(host)
  {
    this.el.appendChild(this.run_button)

    this.timeline.install(this.el);
    
    host.appendChild(this.el);

    this.update();
  }

  this.run = function()
  {
    console.info("Navigator","Run");

    markl.scenario.reload()
    markl.scenario.inject_style(this.fightscript.render());
    markl.navigator.history = markl.scenario.run();

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

  this.should_skip = function()
  {
    return this.history[this.index] && this.history[this.index-1] && this.history[this.index].action == "WAIT" && this.history[this.index-1].action == "WAIT" ? true : false;
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

    this.timeline.update(this.index,this.history);
  }
}

