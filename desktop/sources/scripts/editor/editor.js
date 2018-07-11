function Editor()
{
  this.code_editor = new CodeEditor();
  this.rune_editor = new RuneEditor();

  this.el = document.createElement('yu');
  this.el.id = "editor";
  this.el.className = "rune"

  this.homeview = document.createElement('div');
  this.homeview.id = "homeview";

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

  this.home_tab.onclick = () => { this.el.className = "home" }
  this.code_tab.onclick = () => { this.el.className = "code" }
  this.rune_tab.onclick = () => { this.el.className = "rune" }
  this.hide_tab.onclick = () => { this.el.className += " hide" }

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

  this.add_button.onclick = () => { this.merge_rune(this.rune); }
  this.run_button.onclick = () => { this.run(); }
  this.clear_button.onclick = () => { this.clear_rune(); }
  this.refresh_button.onclick = () => { this.reload_code(); }

  this.status = document.createElement('t')
  this.status.id = "status"

  this.lang        = new FightLang();
  this.fightscript = new FightScript();

  this.is_paused = false;
  this.is_playing = false;
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
    this.menu.appendChild(this.export_button)
    this.menu.appendChild(this.add_button)
    this.menu.appendChild(this.clear_button)
    this.menu.appendChild(this.status)

    // Homeview
    this.el.appendChild(this.homeview)

    // Runeview
    this.el.appendChild(this.rune_editor.el)
    
    // Codeview
    this.el.appendChild(this.code_editor.el)

    // Runeview
    
    host.appendChild(this.el);

    this.update();

    this.fightscript.add(new Rune({trigger:"SIGHT",event:"FIGHTER",condition:"DISTANCE OF 2",action:"ATTACK UP"}))
    this.fightscript.add(new Rune({trigger:"SIGHT",event:"FIGHTER",condition:"ANY",action:"MOVE ANY"}))
    this.fightscript.add(new Rune({trigger:"SIGHT",event:"FIGHTER",condition:"ANY",action:"MOVE RIGHT"}))
  }

  this.run = function()
  {
    markl.scenario.reload()
    markl.scenario.inject_style(this.fightscript.render());

    this.history = markl.scenario.run();
    this.index = 0;

    this.update();
    markl.renderer.update(this.history[this.index].state,this.history[this.index].reaction);
  }

  this.start = function()
  {
    this.is_paused = false;
    this.is_playing = true;
    this.timer = setInterval(() => { this.next(); },TIMING.turn);
  }

  this.pause = function()
  {
    if(!this.history){ return; }
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
    if(!this.history || this.history.length < 1 ){ console.warn("No history, or at end"); this.pause(); return; }
    if(this.history[this.index].state.players[0].hp < 0){ console.warn("Player is dead"); this.pause(); return; }

    this.index += this.index <= this.history.length ? 1 : 0;
    this.update();
    markl.renderer.animator.start()
    markl.renderer.update(this.history[this.index].state);
  }

  this.prev = function()
  {
    if(!this.history || this.history.length < 1 || this.index == 0){ console.warn("No history, or at beginning"); return; }

    this.index -= this.index >= 0 ? 1 : 0;
    this.update();
    markl.renderer.update(this.history[this.index].state);
  }

  this.validate = function()
  {
    var code = this.textbox.value
    var parsed = new FightScript().parse(code)
    var fightscript = new FightScript(parsed)
    var is_valid = fightscript.validate();

    if(is_valid){
      this.fightscript.replace(this.textbox.value); 
      this.status.innerHTML = "Valid code!"
    }
    else{
      this.status.innerHTML = "Invalid code."
    }
  }

  this.update = function(state)
  {
    // Status 
    if(this.history && this.history.length > 0 && this.index > 0){
      var rune = new Rune(this.history[this.index].reaction)
      console.log(`Playing: Player ${this.history[this.index].player.id}`,rune.toString())
      this.status.innerHTML = `${this.index}/${this.history.length}`
      // Update Player UI
      markl.interface.ui.players[this.history[this.index].player.id].rune.replace(rune);
    }
    else{
      this.status.innerHTML = "Idle."  
    }
    
    for(id in runes){
      var rune = runes[id]
      rune.update()
      this.homeview.innerHTML += `<ln>${rune.el.outerHTML}<t class='name'>${rune.name}</t><t class='value'>${rune.render()}</t></ln>`;
    }

    this.code_editor.update();
    this.rune_editor.update();

    this.home_tab.style.display = this.fightscript.runes().length < 1 ? "none" : "inline-block"

    // Menu
    this.run_button.className = this.fightscript.runes().length < 1 ? "disabled run" : "run"
    this.clear_button.className = !this.rune_editor.rune.fragments().length > 0 ? "disabled clear" : "clear"
    this.add_button.className = !this.rune_editor.rune.validate() ? "disabled add" : "add"

    // Homeview
    var runes = this.fightscript.runes()
    this.homeview.innerHTML = ""
  }
}


