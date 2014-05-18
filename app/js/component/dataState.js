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
    var self;
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


    // User Events
    this.userJoined = function (user) {
      self.trigger('dataUserJoined', {
        user: {
          id: user.name(),
          rated: user.val()
        }
      });
    };

    this.userLeft = function (user) {
      $(document).trigger('dataUserLeft', {
        user: {
          id: user.name(),
          rated: user.val()
        }
      });
    };    

    this.userChanged = function (user) {
      $('body').trigger('dataUserChanged', {
        user: {
          id: user.name(),
          rated: user.val()
        }
      });
    };


    // DJ Events
    this.djJoined = function (user) {
      self.trigger('dataDJJoined', {
        dj: {
          id: user.name(),
          rating: user.val()
        }
      });
    };

    this.djLeft = function (user) {
      $(document).trigger('dataDJLeft', {
        dj: {
          id: user.name(),
          rating: user.val()
        }
      });
    };    

    this.djChanged = function (user) {
      $('body').trigger('dataDJChanged', {
        dj: {
          id: user.name(),
          rating: user.val()
        }
      });
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

      // This is hacky. Firebase docs are a lie.
      self = this;

      // Create a firebase connection for this instance
      room = new Firebase(this.attr.fireBaseUrl + storage.genreId);

      users = room.child('users');
      djs = room.child('djs');

      users.on('child_added',   this.userJoined);
      users.on('child_removed', this.userLeft);
      users.on('child_changed', this.userChanged);

      djs.on('child_added',   this.djJoined);
      djs.on('child_removed', this.djLeft);
      djs.on('child_changed', this.djChanged);

      this.on('uiNeedsGenreId',   this.sendGenreId);
      this.on('uiNeedsTrackList', this.sendTrackList);
      this.on('uiNeedsUserList',  this.sendUserList);
      this.on('uiNeedsUser',      this.sendUser);
    });
  }

});
