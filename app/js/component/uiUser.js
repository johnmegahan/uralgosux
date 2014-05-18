define(function (require) {

  'use strict';

  /**
   * Module dependencies
   */

  var defineComponent = require('flight/lib/component');
  var withHogan = require('flight-hogan/lib/with_hogan');

  /**
   * Module exports
   */

  return defineComponent(withHogan, user);

  /**
   * Module function
   */

  function user() {
    var users = {};

    this.defaultAttrs({
      'template': '<li class="user" id={{id}}>{{username}}{{vote}}</li>'
    });

    this.$forUser = function (id) {
      return $('#' + id);
    };

    this.addUser = function (evt, msg) {
      this.$node.append(this.renderTemplate(this.attr.template, msg.user));
    };

    this.removeUser = function (evt, msg) {
      delete users[msg.user.id];
      this.$forUser(msg.user.id).remove();
    };

    this.updateUser = function (evt, msg) {
      var user = msg.user;
      if (user.rated !== users[user.id].rated) {
        this.showUserRating(user);
      }
    };

    this.showUserRating = function (user) {
      this.$forUser(user.id).fadeOut().html(user.rated).fadeIn();
    };

    this.after('initialize', function () {
      this.on(document, 'dataUserJoined',  this.addUser);
      this.on(document, 'dataUserLeft',    this.removeUser);
      this.on(document, 'dataUserChanged', this.updateUser);
    });
  }

});
