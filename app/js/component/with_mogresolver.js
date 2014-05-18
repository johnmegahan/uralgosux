define(function (require) {

  'use strict';

  /**
   * Module exports
   */

  return withMogresolver;

  /**
   * Module function
   */

  function withMogresolver() {
    this.defaultAttrs({

    });

    this.resolveTrack = function(event, msg) {

      var source = msg.source;
      var index = msg.index;
      var track_name = msg.track_name;
      var artist_name = msg.artist_name;

      var self = this;

      $.getJSON("http://search.mog.com/v2/tracks/search.json", {
        q : track_name + ' ' + artist_name
      }, function(data, textStatus, jqXHR) {
        var track = data.tracks[0];
        self.trigger('dataTrackResolved', { source: source, index : index, id : 'tr' + track.track_id })
      });
    };

    this.after('initialize', function () {
      this.on('uiNeedsTrackResolved', this.resolveTrack);
    });
  }

});
