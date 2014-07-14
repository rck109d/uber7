/*global window, document */
/*jshint unused:true, undef: true, eqnull:true */
(function() {
  'use strict';
  var randi = window.uber7.util.randi;
  var WORLD_WIDTH = window.uber7.WORLD_WIDTH;
  var WORLD_HEIGHT = window.uber7.WORLD_HEIGHT;
  var players = [];
  function init() {
    players = [];
    while (players.length === 0) {
      var x = randi(0, WORLD_WIDTH);
      var y = randi(0, WORLD_HEIGHT);
      if (!window.uber7.map.hitsWorld(x - 10, y - 10, 21, 21)) {
        players.push({
          x : x,
          y : y
        });
      }
    }
  }
  function moveTick() {
    var p0 = players[0];
    var plrmx = 0;
    var plrmy = 0;
    var keyDownFlags = window.uber7.input.keyDownFlags;
    var pad = window.uber7.input.pad;
    var hitsWorld = window.uber7.map.hitsWorld;
    if(pad.moveAng != null) {
      plrmx = Math.cos(pad.moveAng);
      plrmy = Math.sin(pad.moveAng);
    } else {
      if (keyDownFlags.up) {
        plrmy--;
      }
      if (keyDownFlags.down) {
        plrmy++;
      }
      if (keyDownFlags.left) {
        plrmx--;
      }
      if (keyDownFlags.right) {
        plrmx++;
      }
    }
    if (!hitsWorld(p0.x - 10 + plrmx, p0.y - 10, 21, 21)) {
      p0.x += plrmx;
    }
    if (!hitsWorld(p0.x - 10, p0.y - 10 + plrmy, 21, 21)) {
      p0.y += plrmy;
    }
    var plrRadius = 10;
    for (var i = 0; i < players.length; i++) {
      var plr = players[i];
      plr.x = Math.min(Math.max(plr.x, plrRadius), WORLD_WIDTH - 1 - plrRadius);
      plr.y = Math.min(Math.max(plr.y, plrRadius), WORLD_HEIGHT - 1 - plrRadius);
    }
    var shoot = window.uber7.bullet.create;
    var toShoot = false;
    var aimmx = 0;
    var aimmy = 0;
    var shootAng = window.uber7.input.pad.shootAng;
    if(shootAng !== null) {
      aimmx = Math.cos(shootAng);
      aimmy = Math.sin(shootAng);
      toShoot = true;
    } else {
      if (keyDownFlags.shoot_up) {
        aimmy--;
        toShoot = true;
      }
      if (keyDownFlags.shoot_down) {
        aimmy++;
        toShoot = true;
      }
      if (keyDownFlags.shoot_left) {
        aimmx--;
        toShoot = true;
      }
      if (keyDownFlags.shoot_right) {
        aimmx++;
        toShoot = true;
      }
      if (keyDownFlags.shoot_up_left) {
        aimmy--;
        aimmx--;
        toShoot = true;
      }
      if (keyDownFlags.shoot_up_right) {
        aimmy--;
        aimmx++;
        toShoot = true;
      }
      if (keyDownFlags.shoot_down_left) {
        aimmy++;
        aimmx--;
        toShoot = true;
      }
      if (keyDownFlags.shoot_down_right) {
        aimmy++;
        aimmx++;
        toShoot = true;
      }
    }
    if (toShoot) {
      var newmx = plrmx + 2 * aimmx;
      var newmy = plrmy + 2 * aimmy;
      if (newmx !== 0 || newmy !== 0) {
        shoot(players[0].x, players[0].y, newmx, newmy);
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
    ctx.fillStyle = "rgb(0, 255, 0)";
    var img = document.getElementById("robot");
    for (var i = 0; i < players.length; i++) {
      var plr = players[i];
      ctx.drawImage(img, plr.x - 10, plr.y - 10);
    }
  }
  init();
  window.uber7.player = {
    move : move,
    draw : draw
  };
})();
