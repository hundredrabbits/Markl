'use strict'

function StageScreen () {
  Screen.call(this, 'stage')

  const speed = 1000
  const Fightscript = require('../server/fightlang/fightscript')

  const stages = {
    dojo_1v0: require('../server/stages/dojo_1v0'),
    gardens_1v2: require('../server/stages/gardens_1v2'),
    woods_1v3: require('../server/stages/woods_1v3'),
    temple_1v4: require('../server/stages/temple_1v4'),
    roof_1v1: require('../server/stages/roof_1v1')
  }

  // Elements
  this.wrapper = this._create_el('wrapper')
  this.stage_garden = this._create_el('stage', 'garden')
  this.stage_dojo = this._create_el('stage', 'dojo')
  this.stage_wood = this._create_el('stage', 'wood')
  this.stage_dungeon = this._create_el('stage', 'dungeon')
  this.stage_rooftop = this._create_el('stage', 'rooftop')

  this.install = function (host) {
    this.wrapper.appendChild(this.stage_garden)
    this.wrapper.appendChild(this.stage_dojo)
    this.wrapper.appendChild(this.stage_wood)
    this.wrapper.appendChild(this.stage_dungeon)
    this.wrapper.appendChild(this.stage_rooftop)
    this.el.appendChild(this.wrapper)

    host.appendChild(this.el)
  }

  this.run = function () {
    const fightscript = new Fightscript(markl.scenario.script)
    const screen_action = fightscript.find('menu', 'stage', 'screen')[0]
    const skip = screen_action == "SKIP"
    const name = Object.keys(stages)[markl.scenario.level]
    
    this.select(name,skip)
  }

  this.select = function (name,skip) {
    console.log('select', name)
    markl.scenario.set_stage(stages[name])
    this.el.className = `screen select_${name.split('_')[0]}`

    if(skip == true){
      markl.flow.goto('arena',true)
    }
    else{
      setTimeout(() => { markl.flow.goto('arena') }, speed * 2)
    }
  }
}

module.exports = StageScreen
