'use strict'

function Markl () {
  GameObject.call(this, 'markl','div')

  this.stage = new Stage()
  this.stage.install(this.el)
  this.control = new Control()
  this.control.install(this.el)

  this.start = function () {
    console.log(this.id, 'Start')

    this.stage.start()
    this.control.start()
  }
}
