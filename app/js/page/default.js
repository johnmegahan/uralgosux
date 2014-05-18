define(function (require) {

  'use strict';

  /**
   * Module dependencies
   */

  var DataState = require('component/dataState');
  var UIDj = require('component/uiDj');
  var UIUser = require('component/uiUser');
  var UIRating = require('component/uiRating');

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
    UIRating.attachTo('#rate-box');
    DataState.attachTo(document,  {
      fireBaseUrl: 'https://uralgosux.firebaseio.com/'
    });
  }

});
