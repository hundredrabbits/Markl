function Effect(pos)
{
  Tile.call(this,pos);

  this.status = {action:"explode",vector:"down"};
  this.animator = new Animator(this);
  this.animator.add(new Animation("explode",[0,1,2,3,4],false));

  this.el = document.createElement("effect");
  this.el.setAttribute("class","");

  this.sprite = document.createElement("sprite");
  this.el.appendChild(this.sprite);

  this.el.setAttribute("style","left:"+this.pos.html().x+"px;top:"+this.pos.html().y+"px"); 
}