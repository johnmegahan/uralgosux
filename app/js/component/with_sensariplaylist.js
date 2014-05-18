define(function (require) {

  'use strict';

  /**
   * Module exports
   */

  return withSensariplaylist;

  /**
   * Module function
   */

  function withSensariplaylist() {
    this.defaultAttrs({});

    this.createSensariPlaylist = function(artist_name) {
      var api_key = "fccab87ea585c109b7f7ac3eb6f9351a";

      var self = this;

      var createSensariArtistRadio = function(data, textStatus, jqXHR) {
        var artist_id = data.data[0].id;

        $.getJSON("http://api.musicgraph.com/api/v2/playlist", {
          api_key : api_key,
          artist_id : artist_id
        }, function(data, textStatus, jqXHR) {
          self.resolveSensariTracks(data.data);
        });
      };

      $.getJSON("http://api.musicgraph.com/api/v2/artist/suggest", {
        api_key : api_key,
        prefix : artist_name
      }, createSensariArtistRadio);

    };

    this.resolveSensariTracks = function(radio_data) {

      var track_ids = radio_data.map(function(track) {
        return 'tr' +  (track.track_ref_id || '') ;
      });

      track_ids = track_ids.filter(function(track_id) {
        return track_id !== 'tr';
      });

      this.trigger('dataSensariPlaylist', { tracks : track_ids} );
    };

    this.getSensariPlaylist = function(event, msg) {
      this.createSensariPlaylist(msg.artist_name);
    };

    this.after('initialize', function () {
      this.on('uiNeedsSensariPlaylist', this.getSensariPlaylist);
    });
  }

});
