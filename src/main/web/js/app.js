/*global define, window, document, navigator */
/*jshint unused:true, undef: true, eqnull:true*/
define(
['underscore', 'jquery', 'knockout', 'input', 'map', 'player', 'bullet']
.concat(),
function(_, $, ko, input, map, player, bullet) {
  'use strict';
  function App() {
    if(!this instanceof App) {
      return new App();
    }
    var self = this;
    self.pad = ko.observable();
    var canvas = document.querySelector('canvas');
    var style = {
      display : 'block',
      width : map.WORLD_WIDTH,
      height : map.WORLD_HEIGHT,
      margin : 'auto',
      background : 'black',
      border : '1px solid white'
    };
    for (var field in style) {
      canvas.style[field] = style[field];
    }
    canvas.width = map.WORLD_WIDTH;
    canvas.height = map.WORLD_HEIGHT;
    function move(dt) {
      player.move(dt);
      bullet.move(dt);
    }
    function draw(dt) {
      var canvas = document.querySelector('canvas');
      var ctx = canvas.getContext("2d");
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      map.draw(ctx, dt);
      player.draw(ctx);
      bullet.draw(ctx);
    }
    var step = (function() {
      var lastTime;
      return function(timestamp) {
        if (!lastTime) {
          lastTime = timestamp;
        }
        var dt = timestamp - lastTime;
        move(dt);
        draw(dt);
        //console.log(dt);
        lastTime = timestamp;
        var foundPad;
        _.each(navigator.getGamepads(), function(pad) {
          if(pad) {
            foundPad = pad;
            input.updateRawPad(pad);
          }
        });
        self.pad(foundPad);
        raf();
      };
    })();
    var raf = window.requestAnimationFrame.bind(null, step);
    raf();
  }
  window.app = new App();
  ko.applyBindings(window.app);
  return window.app;
});
