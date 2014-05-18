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
  }

});
