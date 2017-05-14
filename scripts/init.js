
var TILE_SIZE = new Size(50,50);
var ACT_SPEED = 200;

// Responses

var UP = new Vector(0,1);
var DOWN = new Vector(0,-1);
var LEFT = new Vector(-1,0);
var RIGHT = new Vector(1,0);

markl = new Markl(document.getElementById('markl'));
markl.install();

// Arena
var test_arena = new Arena("Debug",new Size(3,7));
test_arena.add_event(new Spawn(new Pos(1,1)));
test_arena.add_event(new Spawn(new Pos(1,5)));
test_arena.add_event(new Spawn(new Pos(1,3)));
// test_arena.add_event(new Block(new Pos(0,1)));
// test_arena.add_event(new Block(new Pos(0,4)));
test_arena.add_event(new Block(new Pos(0,3)));
markl.set_arena(test_arena);

// Players
markl.add_player(new Sage("Borges",new Custom()));
markl.add_player(new Patience("Calvino",new Idle()));
markl.add_player(new Sage("Barjavel",new Custom()));
// markl.add_player(new Patience("Kafka",new Idle()));

markl.ready();