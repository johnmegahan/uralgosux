define(function (require) {

  'use strict';

  /**
   * Module dependencies
   */

  var defineComponent = require('flight/lib/component');

  /**
   * Module exports
   */

  return defineComponent(uiRating);

  /**
   * Module function
   */

  function uiRating() {
    var currentUser;

    this.defaultAttrs({
      'goodRatingValue': 1,
      'badRatingValue': -1
    });

    this.setupCurrentUser = function (evt, msg) {
      currentUser = {} // TODO: set up the current user
    };

    this.rateDope = function (evt, msg) {
      this.trigger('uiRated', {
        user: currentUser,
        vote: this.attr.goodRatingValue
      });
    };

    this.rateBasic = function (evt, msg) {
      this.trigger('uiRated', {
        user: currentUser,
        vote: this.attr.badRatingValue
      });
    };

    this.after('initialize', function () {
      this.setupCurrentUser();

      this.on('click', {
        'dope': this.rateDope,
        'basic': this.rateBasic
      });
    });
  }

});
