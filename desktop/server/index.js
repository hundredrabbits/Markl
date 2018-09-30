'use strict';

const scenario_name = process.argv[2] ? process.argv[2] : "garden";
const scenario = require('./core/scenario');
const renderer = require('./renderer/renderer.js')

scenario.load(scenario_name);
scenario.run();

let render = renderer.render(scenario.history);
