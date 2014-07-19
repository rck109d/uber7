/*global requirejs */
requirejs.config({
  baseUrl: "js",
  paths: {
    "coffee-script": "//cdnjs.cloudflare.com/ajax/libs/coffee-script/1.7.1/coffee-script.min",
    cs:              "//cdnjs.cloudflare.com/ajax/libs/require-cs/0.4.2/cs.min",
    text:            "//cdnjs.cloudflare.com/ajax/libs/require-text/2.0.10/text",
    jquery:          "//cdnjs.cloudflare.com/ajax/libs/jquery/2.1.0/jquery",
    underscore:      "//cdnjs.cloudflare.com/ajax/libs/underscore.js/1.6.0/underscore",
    knockout:        "//cdnjs.cloudflare.com/ajax/libs/knockout/3.1.0/knockout-debug",
    komapping:       "//cdnjs.cloudflare.com/ajax/libs/knockout.mapping/2.4.1/knockout.mapping"
  },
  shim: {
    underscore: {
      exports: "_"
    },
    knockout: {
      deps: ["jquery"],
      exports: "ko"
    },
    komapping: {
      deps: ["knockout"],
      exports: "komapping"
    }
  }
});
require(['app']);
