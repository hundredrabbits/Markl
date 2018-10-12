'use strict'

function AssetsManager () {
  this.cache = {}
  this.queue = []

  this.load = function(assets)
  {
    console.log("Loading assets")
    this.queue = []
    for(const type in assets){
      for(const id in assets[type]){
        const name = assets[type][id]
        const url = `media/assets/${type}/${name}.png`
        this.queue.push({type:type,name:name,url:url})
      }
    }
    this.store(this.queue)
  }

  this.store = function(queue)
  {
    for(const id in queue){
      const image = new Image()
      image.src = queue[id].url
      image.onload = () => { this.save(queue[id],image); }
    }
  }
  this.save = function(entry,image)
  {
    if(!this.cache[entry.type]){ this.cache[entry.type] = {}; }
    this.cache[entry.type][entry.name] = image;

    this.queue = this.queue.filter(e => e.url !== entry.url)
    console.log(`Loaded ${entry.url}`)

    this.end()
  }

  this.end = function()
  {
    if(this.queue.length > 0){ return; }

    console.log(`Assets ready.`)
    markl.start()
  }

  this.get = function(type,name)
  {
    if(!this.cache[type][name]){ console.warn(`Missing asset: ${type}/${name}`); return; }
    return this.cache[type][name];
  }
}
