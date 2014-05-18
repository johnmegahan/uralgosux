define(function (require) {

  'use strict';

  /**
   * Module exports
   */

  return withEchonestplaylist;

  /**
   * Module function
   */

  function withEchonestplaylist() {
    this.defaultAttrs({});

    this.createEchonestPlaylist = function(artist_name) {
      var api_key = "OMBY4IGSASBF25KEC";

      var self = this;

      $.ajax("http://developer.echonest.com/api/v4/playlist/basic", {
        dataType: "json",
        data: {
          api_key : api_key,
          artist : artist_name,
          format : 'json',
          results : 20,
          type : 'artist-radio',
          bucket : ['id:mog', 'tracks']
        },
        traditional : true,
        success : function(data, textStatus, jqXHR) {
          self.resolveEchonestTracks(data.response.songs);
      }});

    };

    this.resolveEchonestTracks = function(radio_data) {

      var track_ids = radio_data.map(function(track) {
        var tracks = track.tracks;
        var mog_tracks_ids = tracks.map(function(mog_track) {
          return mog_track.foreign_id.replace('mog:track:', '');
        });
        for (var i = 0, l = mog_tracks_ids.length; i < l ;i++) {
          if (mog_tracks_ids[i] !== '') {
            return 'tr' + mog_tracks_ids[i];
          }
        }
        return 'tr';
      });

      track_ids = track_ids.filter(function(track_id) {
        return track_id !== 'tr';
      });

      this.trigger('dataEchonestPlaylist', { tracks : track_ids} );
    };

    this.getEchonestPlaylist = function(event, msg) {
      this.createEchonestPlaylist(msg.artist_name);
    };

    this.after('initialize', function () {
      this.on('uiNeedsEchonestPlaylist', this.getEchonestPlaylist);
    });
  }

});
