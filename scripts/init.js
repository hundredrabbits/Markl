
var TILE_SIZE = new Size(50,50);

markle = new Markle(document.getElementById('markle'));
markle.install();

// Arena
var test_arena = new Arena("Debug",new Size(5,5));
test_arena.add_event(new Spawn(new Pos(0,0)));
test_arena.add_event(new Spawn(new Pos(4,0)));
test_arena.add_event(new Spawn(new Pos(4,4)));
test_arena.add_event(new Spawn(new Pos(0,4)));
test_arena.add_event(new Block(new Pos(1,1)));
markle.set_arena(test_arena);

// Players
markle.add_player(new Player("Borges"));
markle.add_player(new Player("Calvino"));
markle.add_player(new Player("Barjavel"));
markle.add_player(new Player("Kafka"));

markle.ready();