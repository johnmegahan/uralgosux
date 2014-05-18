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
    var self = this;
    var storage = {};
    var fb;
    var room;
    var users;
    var djs;
    window.storage = storage;

    this.defaultAttrs({
      fireBaseUrl: 'https://uralgosux.firebaseio.com/'
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
    };

    this.userJoined = function (user) {
      self.trigger('dataUserJoined', { user: user.val() });
    };

    this.userLeft = function (user) {
      self.trigger('dataUserLeft', { user: user.val() });
    };    

    this.userChanged = function (user) {
      self.trigger('dataUserChanged', { user: user.val() });
    };

    this.sendUser = function (evt, msg) {
      users.child(msg.id).val()
    };

    this.sendUserList = function () {
      self.trigger('dataUsers', { users: storage.users });
    };

    this.storeUsers = function (snapshot) {
      storage.users = snapshot.val();
    };

    this.after('initialize', function () {
      this.sendGenreId();

      // Create a firebase connection for this instance
      room = new Firebase(this.attr.fireBaseUrl + storage.genreId);

      users = room.child('users');
      djs = room.child('djs');

      users.on('child_added',   this.userJoined);
      users.on('child_removed', this.userLeft);
      users.on('child_changed', this.userChanged);

      this.on('uiNeedsGenreId',   this.sendGenreId);
      this.on('uiNeedsTrackList', this.sendTrackList);
      this.on('uiNeedsUserList',  this.sendUserList);
      this.on('uiNeedsUser',      this.sendUser);
    });
  }

});
