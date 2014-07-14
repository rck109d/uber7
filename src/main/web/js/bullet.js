/*global window */
/*jshint unused:true, undef: true, eqnull:true */
(function() {
  'use strict';
  var bullets = [];
  function create(x, y, mx, my) {
    bullets.push({
      x : x,
      y : y,
      mx : mx,
      my : my
    });
  }
  function moveTick() {
    var hitsWorld = window.uber7.map.hitsWorld;
    for (var i = 0; i < bullets.length; i++) {
      var bullet = bullets[i];
      bullet.x += bullet.mx;
      bullet.y += bullet.my;
      if (hitsWorld(bullet.x - 2, bullet.y - 2, 5, 5)) {
        bullets.splice(i, 1);
        i--;
      }
    }
  }
  var ticksToMove = 0;
  function move(dt) {
    var tickLength = 1000.0 / 60;
    ticksToMove += dt / tickLength;
    while(ticksToMove > 0) {
      moveTick();
      ticksToMove--;
    }
  }
  function draw(ctx) {
    ctx.fillStyle = "rgb(255, 0, 0)";
    for (var i = 0; i < bullets.length; i++) {
      var bullet = bullets[i];
      var context = ctx;
      context.beginPath();
      context.rect(bullet.x - 2, bullet.y - 2, 5, 5);
      context.fillStyle = 'yellow';
      context.fill();
      context.lineWidth = 1;
      context.strokeStyle = 'red';
      context.stroke();
    }
  }
  
  window.uber7.bullet = {
    create : create,
    move : move,
    draw : draw
  };
})();
