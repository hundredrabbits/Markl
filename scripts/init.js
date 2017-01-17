
var TILE_SIZE = new Size(50,50);

markle = new Markle(document.getElementById('markle'));
markle.install();

// Arena
var test_arena = new Arena("Debug",new Size(5,5));
test_arena.add_spawn(new Spawn(new Pos(0,0)));
test_arena.add_spawn(new Spawn(new Pos(4,0)));
test_arena.add_spawn(new Spawn(new Pos(4,4)));
test_arena.add_spawn(new Spawn(new Pos(0,4)));
markle.set_arena(test_arena);

// Players
markle.set_player(new Player("Borges"));
markle.set_player(new Player("Calvino"));
markle.set_player(new Player("Barjavel"));
markle.set_player(new Player("Kafka"));

markle.start();