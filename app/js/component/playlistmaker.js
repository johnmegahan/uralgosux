define(function (require) {

  'use strict';

  /**
   * Module dependencies
   */

  var defineComponent = require('flight/lib/component');
  var withMogResolver = require('./with_mogresolver');
  var withGracenotePlaylist = require('./with_gracenoteplaylist');
  var withSensariPlaylist = require('./with_sensariplaylist');

  /**
   * Module exports
   */

  return defineComponent(withMogResolver, withGracenotePlaylist, withSensariPlaylist, playlistmaker);

  /**
   * Module function
   */

  function playlistmaker() {

    this.defaultAttrs({
      djs : ['gracenote', 'sensari']
    });

    this.processGracenotePlaylist = function(event, msg) {
      this.tracks.gracenote = msg;
    };

    this.processSensariPlaylist = function(event, msg) {
      this.tracks.sensari = msg;
    };

    this.createPlaylist = function(event, msg) {

      this.tracks = {};

      if (this.attr.djs.indexOf('gracenote') !== -1) {
        this.trigger('uiNeedsGracenotePlaylist', msg);
      }
      if (this.attr.djs.indexOf('sensari') !== -1) {
        this.trigger('uiNeedsSensariPlaylist',  msg);
      }
    };

    this.after('initialize', function () {
      this.on('uiNeedsPlaylist', this.createPlaylist);
      this.on('dataGracenotePlaylist', this.processGracenotePlaylist);
      this.on('dataSensariPlaylist', this.processSensariPlaylist);
    });
  }

});
