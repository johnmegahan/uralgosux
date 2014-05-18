define(function (require) {

  'use strict';

  /**
   * Module dependencies
   */

  var DataState = require('component/dataState');
  var UIDj = require('component/uiDj');
  var UIUser = require('component/uiUser');

  /**
   * Module exports
   */

  return initialize;

  /**
   * Module function
   */

  function initialize() {
    UIDj.attachTo('#djs');
    UIUser.attachTo('#users');
    DataState.attachTo(document,  {
      fireBaseUrl: 'https://uralgosux.firebaseio.com/'
    });
  }

});
