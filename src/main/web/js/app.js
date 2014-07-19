/*global define, window, document, navigator */
/*jshint unused:true, undef: true, eqnull:true*/
define(
['underscore', 'jquery', 'knockout', 'input', 'map', 'player', 'bullet']
.concat(),
function(_, $, ko, input, map, player, bullet) {
  'use strict';
  var canvas = document.querySelector('canvas');
  var canvasContext = canvas.getContext("2d");
  function App() {
    if(!this instanceof App) {
      return new App();
    }
    var self = this;
    self.pad = ko.observable();
    _.extend(canvas.style, {
      display : 'block',
      width : map.WORLD_WIDTH,
      height : map.WORLD_HEIGHT,
      margin : 'auto',
      background : 'black',
      border : '1px solid white'
    });
    _.extend(canvas, {
      width : map.WORLD_WIDTH,
      height : map.WORLD_HEIGHT
    });
    function move(dt) {
      player.move(dt);
      bullet.move(dt);
    }
    function draw(dt) {
      canvasContext.clearRect(0, 0, canvas.width, canvas.height);
      map.draw(canvasContext, dt);
      player.draw(canvasContext);
      bullet.draw(canvasContext);
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
