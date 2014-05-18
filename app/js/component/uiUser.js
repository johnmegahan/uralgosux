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

  return defineComponent(user);

  /**
   * Module function
   */

  function user() {
    var users = {};

    this.defaultAttrs({
      'template': '<li class="user" id={{id}}>{{rated}}</li>'
    });

    this.addUser = function (evt, msg) {
      this.$node.append(this.renderTemplate(this.attr.template, msg.user));
    };

    this.removeUser = function (evt, msg) {
      delete users[msg.user.id];
      this.$node.find('#' + msg.user.id).remove();
    };

    this.after('initialize', function () {
      this.on(document, 'dataUserJoined', this.addUser);
    });
  }

});
