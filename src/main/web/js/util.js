/*global define */
/*jshint unused:true, undef: true, eqnull:true */
define(
[]
.concat(),
function() {
  'use strict';
  function rand(a, b) {
    return Math.random() * (b - a) + a;
  }
  function randi(a, b) {
    return Math.floor(Math.random() * (b - a + 1) + a);
  }
  function dist(x1, y1, x2, y2) {
    var dx = x2 - x1, dy = y2 - y1;
    return Math.sqrt(dx * dx + dy * dy);
  }
  function rectsOverlap(x1, y1, w1, h1, x2, y2, w2, h2) {
    return x1 + w1 >= x2 && y1 + h1 >= y2 && x2 + w2 >= x1 && y2 + h2 >= y1;
  }
  return {
    rand : rand,
    randi : randi,
    dist : dist,
    rectsOverlap : rectsOverlap
  };
});
