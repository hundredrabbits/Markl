
markle = new Markle(document.getElementById('markle'));
markle.install();

markle.set_arena(new Arena());
markle.set_player(new Player("Borges"));
markle.set_player(new Player("Calvino"));
markle.set_player(new Player("Barjavel"));
markle.set_player(new Player("Kafka"));

markle.start()