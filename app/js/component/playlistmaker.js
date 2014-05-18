define(function (require) {

  'use strict';

  /**
   * Module dependencies
   */

  var defineComponent = require('flight/lib/component');
  var withMogResolver = require('./with_mogresolver');
  var withBeatsTrackVerifier = require('./with_beatstrackverifier');
  var withGracenotePlaylist = require('./with_gracenoteplaylist');
  var withSenzariPlaylist = require('./with_senzariplaylist');
  var withEchonestPlaylist = require('./with_echonestplaylist');

  /**
   * Module exports
   */

  return defineComponent(withMogResolver, withBeatsTrackVerifier, withGracenotePlaylist, withSenzariPlaylist, withEchonestPlaylist, playlistmaker);

  /**
   * Module function
   */

  function playlistmaker() {

    this.defaultAttrs({
      djs : ['gracenote', 'senzari', 'echonest']
    });

    this.processGracenotePlaylist = function(event, msg) {
      this.trigger('uiNeedsTracksVerified', { dj : 'gracenote', tracks: msg.tracks });
    };

    this.processSenzariPlaylist = function(event, msg) {
      this.trigger('uiNeedsTracksVerified', { dj : 'senzari', tracks: msg.tracks });
    };

    this.processEchonestPlaylist = function(event, msg) {
      this.trigger('uiNeedsTracksVerified', { dj : 'echonest', tracks: msg.tracks });
    };

    this.processVerifiedTracks = function(event, msg) {
      this.tracks[msg.dj] = msg.tracks;
      this.service_waiting--;
      this.checkIfDone();
    };

    this.checkIfDone = function() {
      if (this.service_waiting === 0) {
        this.processPlaylists();
      }
    };

    this.processPlaylists = function() {
      var djs = this.attr.djs.slice();

      var tracklist = [];

      var l = djs.length;
      var i = Math.floor(Math.random() * l);
      var track;
      while (true) {
        track = this.tracks[djs[i]].shift();
        tracklist.push(track);
        if (this.tracks[djs[i]].length == 0) break;
        i++;
        i%=l;
      }
      this.trigger('dataPlaylistTracks', { tracks : tracklist});
    };

    this.createPlaylist = function(event, msg) {

      this.tracks = {};
      this.service_waiting = this.attr.djs.length;

      if (this.attr.djs.indexOf('gracenote') !== -1) {
        this.trigger('uiNeedsGracenotePlaylist', msg);
      }
      if (this.attr.djs.indexOf('senzari') !== -1) {
        this.trigger('uiNeedsSenzariPlaylist',  msg);
      }
      if (this.attr.djs.indexOf('echonest') !== -1) {
        this.trigger('uiNeedsEchonestPlaylist',  msg);
      }

    };

    this.after('initialize', function () {
      this.on('uiNeedsPlaylist', this.createPlaylist);
      this.on('dataGracenotePlaylist', this.processGracenotePlaylist);
      this.on('dataSenzariPlaylist', this.processSenzariPlaylist);
      this.on('dataEchonestPlaylist', this.processEchonestPlaylist);
      this.on('dataVerifiedTracks', this.processVerifiedTracks);
    });
  }

});
