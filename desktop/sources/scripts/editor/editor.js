function Editor()
{
  this.code_editor = new CodeEditor();
  this.rune_editor = new RuneEditor();
  this.list_editor = new ListEditor();

  this.el = document.createElement('yu');
  this.el.id = "editor";
  this.el.className = "rune"

  // Tabs

  this.tabs = document.createElement('yu');
  this.tabs.id = "tabs";
  this.home_tab = document.createElement('a')
  this.home_tab.className = "tab home"
  this.home_tab.innerHTML = "<icon/>"
  this.code_tab = document.createElement('a')
  this.code_tab.className = "tab code"
  this.code_tab.innerHTML = "<icon/>"
  this.rune_tab = document.createElement('a')
  this.rune_tab.className = "tab rune"
  this.rune_tab.innerHTML = "<icon/>"
  this.hide_tab = document.createElement('a')
  this.hide_tab.className = "tab hide"
  this.hide_tab.innerHTML = "<icon/>"

  this.home_tab.onclick = () => { this.select("list") }
  this.code_tab.onclick = () => { this.select("code") }
  this.rune_tab.onclick = () => { this.select("rune") }
  this.hide_tab.onclick = () => { this.toggle() }

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
  this.refresh_button = document.createElement('button')
  this.refresh_button.className = "refresh"
  this.refresh_button.innerHTML = "<icon/>"
  this.export_button = document.createElement('button')
  this.export_button.innerHTML = "<icon/>"
  this.export_button.className = "export"
  this.import_button = document.createElement('button')
  this.import_button.innerHTML = "<icon/>"
  this.import_button.className = "import"

  this.add_button.onclick = () => { this.rune_editor.merge(); }
  this.run_button.onclick = () => { this.run(); }
  this.clear_button.onclick = () => { this.rune_editor.clear(); }
  this.refresh_button.onclick = () => { this.code_editor.reload(); }

  this.status = document.createElement('t')
  this.status.id = "status"

  this.fightscript = new FightScript();

  this.is_paused = false;
  this.is_running = false;
  this.history = null;
  this.index = 0;
  this.timer = null;

  this.install = function(host)
  {
    this.el.appendChild(this.tabs)
    this.tabs.appendChild(this.home_tab)
    this.tabs.appendChild(this.rune_tab)
    this.tabs.appendChild(this.code_tab)
    this.tabs.appendChild(this.hide_tab)

    this.el.appendChild(this.menu)
    this.menu.appendChild(this.run_button)
    this.menu.appendChild(this.refresh_button)
    this.menu.appendChild(this.import_button)
    this.menu.appendChild(this.export_button)
    this.menu.appendChild(this.add_button)
    this.menu.appendChild(this.clear_button)
    this.menu.appendChild(this.status)

    this.el.appendChild(this.code_editor.el)
    this.el.appendChild(this.list_editor.el)    
    this.el.appendChild(this.rune_editor.el)
    
    host.appendChild(this.el);

    this.update();

    this.fightscript.add(new Rune({trigger:"SIGHT",event:"FIGHTER",condition:"DISTANCE OF 1",action:"ATTACK TOWARD"}))
    this.fightscript.add(new Rune({trigger:"SIGHT",event:"FIGHTER",condition:"ANY",action:"MOVE TOWARD"}))
    this.fightscript.add(new Rune({trigger:"SIGHT",event:"FIGHTER",condition:"ANY",action:"MOVE ANY"}))
    this.fightscript.add(new Rune({trigger:"SIGHT",event:"FIGHTER",condition:"ANY",action:"WAIT"}))
  }

  this.run = function()
  {
    console.info("run");
    markl.scenario.reload()
    markl.scenario.inject_style(this.fightscript.render());

    this.history = markl.scenario.run();
    this.index = 0;
    this.is_paused = false;
    this.is_running = true;

    this.update();
    markl.renderer.update(this.history[this.index].state,this.history[this.index].reaction);
  }

  this.start = function()
  {
    console.info("start");
    this.is_paused = false;
    this.is_running = true;
    this.timer = setInterval(() => { this.next(); },TIMING.turn);
  }

  this.pause = function()
  {
    console.info("pause");
    if(!this.history){ return; }
    if(this.is_paused){ return; }

    this.is_paused = true;
    clearInterval(this.timer);
    this.update();
    markl.renderer.update(this.history[this.index].state);
  }

  this.resume = function()
  {
    console.info("resume");
    this.is_paused = false;
    this.timer = setInterval(() => { this.next(); },TIMING.turn);
    this.update();
    markl.renderer.update(this.history[this.index].state);
  }

  this.stop = function()
  {
    console.info("stop");
    this.is_paused = false;
    this.is_running = false;
    this.index = 0;
    clearInterval(this.timer);
    this.update();
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

  this.should_skip = function()
  {
    return this.history[this.index] && this.history[this.index-1] && this.history[this.index].action == "WAIT" && this.history[this.index-1].action == "WAIT" ? true : false;
  }

  this.validate = function()
  {
    var code = this.textbox.value
    var fightscript = new FightScript().parse(code)
    var is_valid = fightscript.validate();

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
    this.el.className = name;
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

  this.update = function(state)
  {
    console.info(`===================== ${this.index}`)
    // Status 
    if(this.history && this.history.length > 0 && this.index > 0){
      var rune = new Rune(this.history[this.index].reaction)
      console.log(`Playing: Player ${this.history[this.index].player.id}`,rune.toString())
      // Update Player UI
      markl.interface.ui.players[this.history[this.index].player.id].rune.replace(rune);
    }
    
    var state = this.history && this.history.length > 0 && this.index > 0 ? this.history[this.index] : null;

    this.code_editor.update(state);
    this.rune_editor.update(state);
    this.list_editor.update(state);

    this.home_tab.style.display = this.fightscript.runes().length < 1 ? "none" : "inline-block"

    // Menu
    this.run_button.className = this.fightscript.runes().length < 1 ? "disabled run" : "run"
    this.clear_button.className = !this.rune_editor.rune.fragments().length > 0 ? "disabled clear" : "clear"
    this.add_button.className = !this.rune_editor.rune.validate() ? "disabled add" : "add"

    this.update_status(state);
  }

  this.update_status = function(state)
  {
    var html = this.is_running ? "Running. " : "Idle. "
    html += this.history && this.history.length > 0 && this.index > 0 ? `${this.index}/${this.history.length} ${this.code_editor.status(state)} ${this.rune_editor.status(state)} ${this.list_editor.status(state)}` : ''
    this.status.innerHTML = html
  }
}


