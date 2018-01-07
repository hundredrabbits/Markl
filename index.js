const supervisor  = require('./supervisor')
const state       = require('./state.js')

// console.log(process.argv[2]);

var result = supervisor.render(state);

console.log(result)