function Effect(pos)
{
  Tile.call(this,pos);

  this.status = {action:"explode",vector:"down"};
  this.animator = new Animator(this,100,false);
  this.animator.add(new Animation("explode",[0,1,2,3,4],false));

  this.el = document.createElement("effect");
  this.el.setAttribute("class","");

  this.sprite = new Sprite(this);
  this.el.appendChild(this.sprite.el);

  this.el.setAttribute("style","left:"+this.pos.html().x+"px;top:"+this.pos.html().y+"px"); 
}