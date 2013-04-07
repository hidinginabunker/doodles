// Some helper functions for making doodles in browsers



// shim requestAnimationFrame
(function() {
var requestAnimationFrame = window.requestAnimationFrame || window.mozRequestAnimationFrame ||
  window.webkitRequestAnimationFrame || window.msRequestAnimationFrame;
  window.requestAnimationFrame = requestAnimationFrame;
})();


var Doodle = function(config) {
  this._canvasID = config.canvas
}


Doodle.prototype.init = function() {
  var self = this
  window.addEventListener('load', function() {

    if (!self.isCanvasSupported()) {
      console.log("yuck! your browser doesn't support canvas!")
      return;
    }

    self.canvas = document.getElementById(self._canvasID)
    self.ctx = self.canvas.getContext('2d')

    self.initScene();
  }, false)

}


Doodle.prototype.onNoCanvasSupport = function() {
  console.log("yuck! your browser doesn't support canvas!")
  return;
}


Doodle.prototype.isCanvasSupported = function(){
  return !! document.createElement('canvas').getContext
}


Doodle.prototype.getCursorPosition = function(e) {
  var x, y
  if (e.pageX || e.pageY) {
    x = e.pageX
    y = e.pageY
  }
  else {
    x = e.clientX + document.body.scrollLeft + document.documentElement.scrollLeft
    y = e.clientY + document.body.scrollTop + document.documentElement.scrollTop
  }
  x -= this.canvas.offsetLeft
  y -= this.canvas.offsetTop
  return {x: x, y: y}
}


Doodle.prototype.clearCanvas = function() {
  this.ctx.clearRect(0,0, this.canvas.width, this.canvas.height)
}


Doodle.prototype.render = function() {
  // override in subclass
}


Doodle.prototype.animate = function() {
  var self = this;
  window.requestAnimationFrame(function(time) {
    self.clearCanvas()
    self.render()
    self.animate()
  })
}
