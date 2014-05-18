define(function (require) {

  'use strict';

  /**
   * Module dependencies
   */

  var defineComponent = require('flight/lib/component');
  var withMogResolver = require('./with_mogresolver');
  var withGracenotePlaylist = require('./with_gracenoteplaylist');

  /**
   * Module exports
   */

  return defineComponent(withMogResolver, withGracenotePlaylist, playlistmaker);

  /**
   * Module function
   */

  function playlistmaker() {

    this.defaultAttrs({
      djs : ['gracenote']
    });

    this.processGracenotePlaylist = function(event, msg) {
      this.tracks.gracenote = msg;
    };

    this.createPlaylist = function(event, msg) {

      this.tracks = {};

      if (this.attr.djs.indexOf('gracenote') !== -1) {
        this.trigger('uiNeedsGracenotePlaylist', msg);
      }
    };

    this.after('initialize', function () {
      this.on('uiNeedsPlaylist', this.createPlaylist);
      this.on('dataGracenotePlaylist', this.processGracenotePlaylist);
    });
  }

});
