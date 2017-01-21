
var TILE_SIZE = new Size(50,50);

// Responses

var UP = new Vector(0,1);
var DOWN = new Vector(0,-1);
var LEFT = new Vector(-1,0);
var RIGHT = new Vector(1,0);

markl = new Markl(document.getElementById('markl'));
markl.install();

// Arena
var test_arena = new Arena("Debug",new Size(5,5));
test_arena.add_event(new Spawn(new Pos(0,0)));
test_arena.add_event(new Spawn(new Pos(4,0)));
test_arena.add_event(new Spawn(new Pos(4,4)));
test_arena.add_event(new Spawn(new Pos(0,4)));
// test_arena.add_event(new Block(new Pos(1,1)));
// test_arena.add_event(new Block(new Pos(3,1)));
// test_arena.add_event(new Block(new Pos(1,3)));
// test_arena.add_event(new Block(new Pos(3,3)));
// test_arena.add_event(new Block(new Pos(0,1)));
markl.set_arena(test_arena);

// Players
markl.add_player(new Sage("Borges",new Custom()));
markl.add_player(new Patience("Calvino",new Idle()));
markl.add_player(new Patience("Barjavel",new Idle()));
markl.add_player(new Patience("Kafka",new Idle()));

markl.ready();