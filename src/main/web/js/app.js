/*global window, document, ko, navigator, _ */
/*jshint unused:true, undef: true, eqnull:true */
(function() {
  'use strict';
  function App() {
    if(!this instanceof App) {
      return new App();
    }
    var self = this;
    self.pad = ko.observable();
    var WORLD_WIDTH = 1024, WORLD_HEIGHT = 768;
    var canvas = document.querySelector('canvas');
    var style = {
      display : 'block',
      width : WORLD_WIDTH,
      height : WORLD_HEIGHT,
      margin : 'auto',
      background : 'black',
      border : '1px solid white'
    };
    for ( var field in style) {
      canvas.style[field] = style[field];
    }
    canvas.width = WORLD_WIDTH;
    canvas.height = WORLD_HEIGHT;
    function move(dt) {
      window.uber7.player.move(dt);
      window.uber7.bullet.move(dt);
    }
    function draw(dt) {
      var canvas = document.querySelector('canvas');
      var ctx = canvas.getContext("2d");
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      window.uber7.map.draw(ctx, dt);
      window.uber7.player.draw(ctx);
      window.uber7.bullet.draw(ctx);
    }
    window.uber7 = {
      WORLD_WIDTH : 1024,
      WORLD_HEIGHT : 768
    };
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
            window.uber7.input.updateRawPad(pad);
          }
        });
        self.pad(foundPad);
        raf();
      };
    })();
    var raf = window.requestAnimationFrame.bind(null, step);
    raf();
    ko.applyBindings(self);
  }
  window.app = new App();
})();
