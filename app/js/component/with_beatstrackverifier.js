define(function (require) {

  'use strict';

  /**
   * Module exports
   */

  return withBeatstrackverifier;

  /**
   * Module function
   */

  function withBeatstrackverifier() {
    this.defaultAttrs({

    });

    this.verifyTracks = function(event, msg) {

      var client_id = "cwugqdk8f8em99j6yewzvq6m";

      var self = this;

      $.ajax("https://partner.api.beatsmusic.com/v1/api/tracks", {
        dataType: "json",
        data: {
          ids : msg.tracks,
          client_id : client_id
        },
        traditional : true,
        success : function(data, textStatus, jqXHR) {
          var tracks = data.data;
          tracks = tracks.map(function(track) {
            return  {
              track  : track,
              dj : msg.dj
            }
          });

          self.trigger('dataVerifiedTracks', { tracks : tracks , dj : msg.dj });
      }});

    };

    this.after('initialize', function () {
      this.on('uiNeedsTracksVerified', this.verifyTracks);
    });
  }

});
