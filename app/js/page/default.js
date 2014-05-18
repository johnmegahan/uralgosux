define(function (require) {

  'use strict';

  /**
   * Module dependencies
   */
  var DataState = require('component/dataState');

  /**
   * Module exports
   */

  return initialize;

  /**
   * Module function
   */

  function initialize() {
    DataState.attachTo(document);
    if (!window.storage || !window.storage.user) {
        var DataAuth = require('component/dataAuth');
        DataAuth.attachTo(document);
    }
  }

});
