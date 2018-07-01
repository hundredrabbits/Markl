function Rune(characters = [])
{
  this.el = document.createElement('yu');
  this.el.className = "rune"
  this.characters = characters;
  
  this.trigger = null;
  this.event = null;
  this.condition = null;
  this.action = null;

  this.build = function(depth,value)
  {
    this.characters[depth] = value;
    this.update();
  }

  this.clear = function()
  {
    this.characters = []
    this.update()
  }

  this.update = function()
  {
    console.log(this.characters)
    this.trigger = this.characters[0] ? this.characters[0].toUpperCase() : null
    this.event = this.characters[1] ? this.characters[1].toUpperCase() : null
    this.condition = this.characters[2] ? this.characters[2].toUpperCase() : null
    this.action = this.characters[3] ? this.characters[3].toUpperCase() : null

    this.draw()
  }

  this.draw = function()
  { 
    var html = ""

    if(this.trigger){ html += "<yu class='fragment trigger'></yu>" }
    if(this.event){ html += "<yu class='fragment event'></yu>" }
    if(this.condition){ html += "<yu class='fragment condition'></yu>" }
    if(this.action){ html += "<yu class='fragment action'></yu>" }

    this.el.innerHTML = html
  }

  this.is_complete = function()
  {
    return this.trigger && this.event && this.condition && this.action;
  }
}

function Fragment(host,type,text)
{
  this.host = host;
  this.type = type;
  this.text = text;
  this.depth = ["TRIGGER","EVENT","CONDITION","ACTION"].indexOf(this.type)
  this.el = document.createElement('button');
  this.el.className = type.toLowerCase();
  this.el.innerHTML = `${text}`;

  this.el.onclick = () => { this.construct(); }

  this.construct = function()
  {
    this.host.add_fragment(this)
  }
}