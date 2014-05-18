define(function (require) {

  'use strict';

  /**
   * Module exports
   */

  return withGracenoteplaylist;

  /**
   * Module function
   */

  function withGracenoteplaylist() {
    this.defaultAttrs({});

    this.createGracenotePlaylist = function(artist_name) {
      var client_prefix = "7725056";
      var client_tag = "93C882033C9DC9824C873E5DEB94B40A";
      var client_id = client_prefix + "-" + client_tag;
      var user_id = "";

      var self = this;

      var createGracenoteRadio = function(data, textStatus, jqXHR) {
        user_id = data.RESPONSE[0].USER[0].VALUE;
        $.getJSON("http://devapi.gracenote.com/webapi/json/1.0/radio/create", {
          artist_name : artist_name,
          client : client_id,
          user : user_id,
          return_count : 20,
          dmca : 'yes'
        }, function(data, textStatus, jqXHR) {
          self.resolveGracenoteTracks(data.RESPONSE[0]);
        });
      };

      $.getJSON("http://devapi.gracenote.com/webapi/json/1.0/register", {
        client : client_id
      }, createGracenoteRadio);
    };

    this.resolveGracenoteTracks = function(radio_data) {
      var i = 0, l = radio_data.ALBUM.length;
      var track;
      this.waiting = l;
      for (i,l; i < l; i++) {
        track = radio_data.ALBUM[i];
        this.trigger('uiNeedsTrackResolved', {
          source: 'gracenote',
          index : track.ORD,
          artist_name : track.ARTIST[0].VALUE,
          track_name : track.TRACK[0].TITLE[0].VALUE
        });
      }
    };

    this.handleTrackResolved = function(event, msg) {
      if (msg.source !== 'gracenote') return;
      this.gn_tracks.push({
        ord : msg.ord,
        track : msg.id
      });
      this.waiting--;
      if (this.waiting == 0) {
        this.gn_tracks.sort(function(a,b) {
          return a.ord - b.ord;
        });
        var track_ids = this.gn_tracks.map(function(track) {
          return track.track;
        });

        this.trigger('dataGracenotePlaylist', { tracks : track_ids} );
      }
    };

    this.getGracenotePlaylist = function(event, msg) {
      this.gn_tracks = [];
      this.createGracenotePlaylist(msg.artist_name);
    };

    this.after('initialize', function () {
      this.on('uiNeedsGracenotePlaylist', this.getGracenotePlaylist);
      this.on('dataTrackResolved', this.handleTrackResolved);
    });
  }

});
