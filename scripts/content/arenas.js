var arenas = {};

arenas.training = new Arena("Training",new Size(6,6),[
  new Spawn(new Pos(1,1)),
  new Spawn(new Pos(1,5)),
  new Spawn(new Pos(5,1)),
  new Spawn(new Pos(5,5)),
  new Block(new Pos(2,2)),
  new Block(new Pos(0,3))
]);