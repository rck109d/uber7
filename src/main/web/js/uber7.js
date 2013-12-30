/*global window, document */
/*jshint unused:true, undef: true, eqnull:true */
(function() {
  'use strict';
  var WORLD_WIDTH=1024, WORLD_HEIGHT=768;
  var canvas = document.querySelector('canvas');
  var style = {
      display: 'block',
      width: WORLD_WIDTH,
      height: WORLD_HEIGHT,
      margin: 'auto',
      background: 'black',
      border: '1px solid white'
  };
  for(var field in style) { canvas.style[field] = style[field]; }
  canvas.width = WORLD_WIDTH;
  canvas.height = WORLD_HEIGHT;
  function move() {
    window.uber7.player.move();
    window.uber7.bullet.move();
  }
  function draw() {
    var canvas = document.querySelector('canvas');
    var ctx = canvas.getContext("2d");
    ctx.clearRect(0,0, canvas.width, canvas.height);
    window.uber7.map.draw(ctx);
    window.uber7.player.draw(ctx);
    window.uber7.bullet.draw(ctx);
  }
  window.uber7 = {
      WORLD_WIDTH: 1024,
      WORLD_HEIGHT: 768
  };
  window.setInterval(function() {
    move();
    draw();
  }, 1000/60);
})();
