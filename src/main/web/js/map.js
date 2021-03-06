/*global define */
/*jshint unused:true, undef: true, eqnull:true */
define(
['util']
.concat(),
function(util) {
  'use strict';
  var randi = util.randi;
  var dist = util.dist;
  var rectsOverlap = util.rectsOverlap;
  var WORLD_WIDTH = 1024;
  var WORLD_HEIGHT = 768;
  var walls = [];
  function init() {
    walls = [];
    while (walls.length < Math.floor(WORLD_WIDTH * WORLD_HEIGHT / 24000)) {
      var newWall = {
        w : randi(20, 100),
        h : randi(20, 100)
      };
      newWall.x = randi(20, WORLD_WIDTH - 20 - newWall.w);
      newWall.y = randi(20, WORLD_HEIGHT - 20 - newWall.h);
      var newWallDiagHalf = dist(0, 0, newWall.w, newWall.h) / 2;
      var newWallCenterX = newWall.x + newWall.w / 2;
      var newWallCenterY = newWall.y + newWall.h / 2;
      var tooClose = false;
      for (var i = 0; i < walls.length; i++) {
        var wall = walls[i];
        var centerX = wall.x + wall.w / 2;
        var centerY = wall.y + wall.h / 2;
        var diagHalf = dist(0, 0, wall.w, wall.h) / 2;
        var distBetweenCenters = dist(newWallCenterX, newWallCenterY, centerX, centerY);
        if (distBetweenCenters < diagHalf + newWallDiagHalf + 30) {
          tooClose = true;
        }
      }
      if (!tooClose) {
        walls.push(newWall);
      }
    }
  }
  function hitsWorld(x, y, w, h) {
    for (var i = 0; i < walls.length; i++) {
      var wall = walls[i];
      if (rectsOverlap(x, y, w, h, wall.x, wall.y, wall.w, wall.h)) {
        return true;
      }
    }
    return !rectsOverlap(x, y, 1, 1, 0, 0, WORLD_WIDTH - 1, WORLD_HEIGHT - 1);
  }
  var wallsPulse = 0, wallsPulseChange = 6;
  function draw(ctx, dt) {
    var tickLength = 1000.0 / 60;
    if (wallsPulse >= 60) {
      wallsPulseChange = Math.round(-4 * dt / tickLength);
    } else if (wallsPulse <= -60) {
      wallsPulseChange = Math.round(6 * dt / tickLength);
    }
    wallsPulse += wallsPulseChange;
    ctx.fillStyle = "rgb(0, " + (140 + wallsPulse) + ", " + (195 + wallsPulse) + ")";
    for (var i = 0; i < walls.length; i++) {
      var w = walls[i];
      ctx.fillRect(w.x, w.y, w.w, w.h);
    }
  }
  
  init();
  return {
    init : init,
    hitsWorld : hitsWorld,
    draw : draw,
    WORLD_WIDTH: WORLD_WIDTH,
    WORLD_HEIGHT: WORLD_HEIGHT
  };
});
