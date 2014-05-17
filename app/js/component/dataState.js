define(function (require) {

  'use strict';

  /**
   * Module dependencies
   */

  var defineComponent = require('flight/lib/component');

  /**
   * Module exports
   */

  return defineComponent(dataState);

  /**
   * Module function
   */

  function dataState() {
    var storage = {};
    var fb;
    var room;
    var users;
    var djs;

    this.defaultAttrs({
      fireBaseUrl: ''
    });

    this.getGenreId = function () {
      return window.location.hash.split('#')[1];
    };

    this.sendGenreId = function () {
      var genreId = storage.genreId || this.getGenreId();
      storage.genreId = genreId;
      this.trigger('dataGenreId', { genre: { id: genreId }});
    };

    this.sendTrackList = function () {
      fb.
    };

    this.userJoined = function (user) {
      this.trigger('dataUserJoined', { user: user });
    };

    this.userLeft = function () {
      this.trigger('dataUserLeft', { user: user });
    };

    this.userList = function () {
      this.trigger('dataUserList', { users: user.val() });
    };

    this.remoteUserVoted function () {

    };

    this.after('initialize', function () {
      this.sendGenreId();

      // Create a firebase connection for this instance
      room = new new Firebase(this.attr.fireBaseUrl + storage.genreId);
      users = room.child('users');
      djs = room.child('djs');

      users.on('child_added',   this.userJoined);
      users.on('child_removed', this.userLeft);
      users.on('value',         this.remoteUserVoted);

      this.on('uiNeedsGenreId', this.sendGenreId);
      this.on('uiNeedsTrackList', this.sendTrackList);
      this.on('uiNeedsUserList', this.userList);
    });
  }

});
