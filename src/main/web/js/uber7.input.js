/*global window, document */
/*jshint unused:true, undef: true, eqnull:true */
(function() {
  'use strict';
  var keyCodeToFlag = {
      87:'up',                // W
      83:'down',              // S
      65:'left',              // A
      68:'right',             // D
      38:'up',                // UpArw
      40:'down',              // DnArw
      37:'left',              // LtArw
      39:'right',             // RtArw
      85:'shoot_up',          // U
      74:'shoot_down',        // J
      77:'shoot_down',        // M
      72:'shoot_left',        // H
      75:'shoot_right',       // K
      89:'shoot_up_left',     // Y
      73:'shoot_up_right',    // I
      78:'shoot_down_left',   // N
      188:'shoot_down_right', // COMMA
      97:'shoot_down_left',   // NUM_1
      98:'shoot_down',        // NUM_2
      99:'shoot_down_right',  // NUM_3
      100:'shoot_left',       // NUM_4
      101:'shoot_down',       // NUM_5
      102:'shoot_right',      // NUM_6
      103:'shoot_up_left',    // NUM_7
      104:'shoot_up',         // NUM_8
      105:'shoot_up_right'    
  };
  var keyDownFlags = {};
  function setKeyDownFlag(keyCode, val) {
    var flag = keyCodeToFlag[keyCode];
    if(flag) {
      keyDownFlags[flag] = val;
    } else if(false) {
      window.console.log(keyCode);
    }
  }
  function clearFlags() {
    for (var member in keyDownFlags) delete keyDownFlags[member];
  }
  document.addEventListener('keydown', function(e) { setKeyDownFlag(e.keyCode, true); }, false);
  document.addEventListener('keyup', function(e) { setKeyDownFlag(e.keyCode, false); }, false);
  window.addEventListener('blur', function(){clearFlags();}, false);
  window.uber7.input = {
      keyDownFlags: keyDownFlags
  };
})();
