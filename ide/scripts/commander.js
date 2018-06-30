function Commander()
{
  this.el = document.createElement('yu');
  this.el.id = "commander";

  this.preview = document.createElement('pre');
  this.preview.id = "preview";

  this.fightscript = new FightScript();

  this.runes = []
  
  this.install = function(host)
  {
    host.appendChild(this.el);
    host.appendChild(this.preview);
  }

  this.add = function(rune)
  {
    this.fightscript.add(rune)
    this.update()
  }

  this.update = function()
  {
    this.el.innerHTML = `${this.runes.length} runes`;
    this.preview.innerHTML = this.fightscript.export();
  }
}