define(function (require) {

  'use strict';

  /**
   * Module exports
   */

  return withSenzariplaylist;

  /**
   * Module function
   */

  function withSenzariplaylist() {
    this.defaultAttrs({});

    this.createSenzariPlaylist = function(artist_name) {
      var api_key = "fccab87ea585c109b7f7ac3eb6f9351a";

      var self = this;

      var createSenzariArtistRadio = function(data, textStatus, jqXHR) {
        var artist_id = data.data[0].id;

        $.getJSON("http://api.musicgraph.com/api/v2/playlist", {
          api_key : api_key,
          artist_id : artist_id
        }, function(data, textStatus, jqXHR) {
          self.resolveSenzariTracks(data.data);
        });
      };

      $.getJSON("http://api.musicgraph.com/api/v2/artist/suggest", {
        api_key : api_key,
        prefix : artist_name
      }, createSenzariArtistRadio);

    };

    this.resolveSenzariTracks = function(radio_data) {

      var track_ids = radio_data.map(function(track) {
        return 'tr' +  (track.track_ref_id || '') ;
      });

      track_ids = track_ids.filter(function(track_id) {
        return track_id !== 'tr';
      });

      this.trigger('dataSenzariPlaylist', { tracks : track_ids} );
    };

    this.getSenzariPlaylist = function(event, msg) {
      this.createSenzariPlaylist(msg.artist_name);
    };

    this.after('initialize', function () {
      this.on('uiNeedsSenzariPlaylist', this.getSenzariPlaylist);
    });
  }

});
