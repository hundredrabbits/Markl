
var TILE_SIZE = new Size(50,50);

// Responses

var WAIT = new Wait();
var MOVE_UP = new Move(new Pos(0,1));
var MOVE_DOWN = new Move(new Pos(0,-1));
var MOVE_LEFT = new Move(new Pos(0,-1));
var MOVE_RIGHT = new Move(new Pos(0,-1));
var ATTACK_UP = new Move(new Pos(0,-1));
var ATTACK_DOWN = new Move(new Pos(0,-1));
var ATTACK_LEFT = new Move(new Pos(0,-1));
var ATTACK_RIGHT = new Move(new Pos(0,-1));

markl = new Markl(document.getElementById('markl'));
markl.install();

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
markl.set_arena(test_arena);

// Players
markl.add_player(new Sage("Borges",new Custom()));
markl.add_player(new Patience("Calvino",new Idle()));
markl.add_player(new Patience("Barjavel",new Idle()));
markl.add_player(new Patience("Kafka",new Idle()));

markl.ready();