"use strict";

function Stage_Screen()
{
  View.call(this);

  this.stage = document.createElement('stage');
  this.background = document.createElement('background');
  this.animator = new Animator(this.el);

  let STAGE = {padding:{x:15,y:15},tile:80}

  this.sprites = { players:{}, events:{}, effects:[] };

  this.install = function(host)
  {
    this.stage.appendChild(this.background);
    this.el.appendChild(this.stage);

    host.appendChild(this.el)

    this.setup();
  }

  this.setup = function()
  {
    this.stage.style.transition = `all ${TIMING.camera}ms`;

    // Resize
    this.stage.style.width = `${5 * STAGE.tile}px`;
    this.stage.style.height = `${5 * STAGE.tile}px`;
    // Center
    this.stage.style.left = `calc(50% - ${(5 * STAGE.tile)/2}px)`;
    this.stage.style.top = `calc(55% - ${(5 * STAGE.tile)/2}px)`;
    this.stage.className = markl.scenario.name;
  }

  this.update = function(state,reaction)
  {
    if(!state){ return; }

    this.remove_effects();
    this.verify_sprites(state);
    this.update_sprites(state);
    this.add_effects(state);
    this.focus(state);

    this.animator.start();

    markl.interface.update(state,reaction);
    markl.navigator.update(state);
  }

  this.verify_sprites = function(state)
  {
    for(let id in state.players){
      let player = state.players[id];
      if(this.sprites.players[player.id]){ continue; }
      console.log("Creating sprite for ",player.id)
      let sprite = new Sprite("player",player.id)
      sprite.setup(player);
      this.sprites.players[player.id] = sprite;
      this.stage.appendChild(sprite.el);
    }
  }

  this.update_sprites = function(state)
  {
    for(let id in this.sprites.players){
      let player = this.sprites.players[id];
      player.animate_to(state.players[id].pos);
      player.set_status(state.players[id].status);
      player.set_character(state.players[id].character);
      player.set_vector(state.players[id].vector);
      player.update();
    }
  }

  this.remove_effects = function()
  {
    for(let id in this.sprites.effects){
      let effect = this.sprites.effects[id]
      effect.el.parentNode.removeChild(effect.el);
    }
    this.sprites.effects = [];
  }

  this.add_effects = function(state)
  {
    for(let id in state.effects){
      let effect = state.effects[id];
      this.add_effect("hit",effect.pos);
    }
  }

  this.add_effect = function(name,pos)
  {
    let effect = new Effect(name,pos);
    this.sprites.effects.push(effect);
    this.stage.appendChild(effect.el)
  }

  this.focus = function(state)
  {
    let positions = [];

    for(let id in state.players){
      let player = state.players[id];
      if(player.hp < 1){ continue; }
      positions.push(player.pos);
    }

    let sum = {x:0,y:0};
    for(let id in positions){
      sum.x += positions[id].x;
      sum.y += positions[id].y;
    }
    let average = {x:sum.x/positions.length,y:sum.y/positions.length};
    let stage_center = (STAGE.tile * 4)/2;

    let x = positions.length > 1 ? -1 * (average.x * STAGE.tile) + stage_center : 0
    let y = positions.length > 1 ? -1 * (average.y * STAGE.tile) + stage_center : 0

    this.stage.style.transform = `translate(${parseInt(x)}px, ${parseInt(y)}px)`
  }
}