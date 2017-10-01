var arenas = {};

arenas.training = new Arena("Training",new Size(5,5),[
  new Spawn(new Pos(0,0)),
  new Spawn(new Pos(4,4)),
  new Spawn(new Pos(4,0)),
  new Spawn(new Pos(0,4)),
  new Block(new Pos(1,1)),
  new Block(new Pos(3,3))
]);