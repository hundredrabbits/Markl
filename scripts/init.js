
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
test_arena.add_event(new Block(new Pos(3,1)));
test_arena.add_event(new Block(new Pos(1,3)));
test_arena.add_event(new Block(new Pos(3,3)));
markle.set_arena(test_arena);

// Players
markle.add_player(new Player("Borges",new Custom()));
markle.add_player(new Player("Calvino",new Idle()));
markle.add_player(new Player("Barjavel",new Idle()));
markle.add_player(new Player("Kafka",new Idle()));

markle.ready();