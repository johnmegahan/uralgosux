define(function (require) {

  'use strict';

  /**
   * Module dependencies
   */
  var DataState = require('component/dataState');
  var PlaylistMaker = require('component/playlistMaker');
  var UIDj = require('component/uiDj');
  var UIUser = require('component/uiUser');
  var UIRating = require('component/uiRating');
  var UIMarquee = require('component/uiMarquee');

  /**
   * Module exports
   */

  return initialize;

  /**
   * Module function
   */

  function initialize() {
    UIDj.attachTo('#djs');
    UIUser.attachTo('#users');
    UIRating.attachTo('#rate-box');
    UIMarquee.attachTo(document);
    DataState.attachTo(document,  {
      fireBaseUrl: 'https://uralgosux.firebaseio.com/'
    });
    if (!window.storage || !window.storage.user) {
        var DataAuth = require('component/dataAuth');
        DataAuth.attachTo(document);
    }
    PlaylistMaker.attachTo(document);

    // // test playlist
    // $(document).on('dataPlaylistTracks', function(event, msg) {
    //   // $('body').html('<pre>' + JSON.stringify(msg, null, '\t') + '</pre>');
    //   console.dir(msg);
    // });
    // $(document).trigger('uiNeedsPlaylist', { artist_name : 'Weezer' });

  }

});
