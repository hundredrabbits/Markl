var arenas = {};

arenas.training = new Arena("Training",new Size(6,6),[
  new Spawn(new Pos(0,0)),
  new Spawn(new Pos(5,5)),
  new Spawn(new Pos(5,0)),
  new Spawn(new Pos(0,5)),
  new Block(new Pos(1,1)),
  new Block(new Pos(4,4))
]);