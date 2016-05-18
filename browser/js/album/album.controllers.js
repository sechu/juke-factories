'use strict';

juke.controller('AlbumCtrl', function ($scope, $log, StatsFactory, AlbumFactory, PlayerFactory) {

  AlbumFactory.fetchAll()
  .then(function(albums) {
    var albumsFull = albums.map(function(album) {
      return AlbumFactory.fetchById(album.id);
    });
    return Promise.all(albumsFull);
  })
  .then(function(albumsFull) {
    return $scope.albums = albumsFull;
  })
  .then(function() {
    var album = $scope.albums[0];
    album.imageUrl = '/api/albums/' + album.id + '/image';
    album.songs.forEach(function (song, i) {
      song.audioUrl = '/api/songs/' + song.id + '/audio';
      song.albumIndex = i;
    })


    // StatsFactory.totalTime(album)
    // .then(function(time) {
    //    album.totalTime = Math.round(time/60)+"min";
       $scope.album = album;
    // })    
  })
  .catch($log.error); // $log service can be turned on and off; also, pre-bound

  $scope.currentSong = PlayerFactory.getCurrentSong;
  $scope.playing = PlayerFactory.isPlaying;

  
  $scope.toggle = function(song) {
    if (song === $scope.currentSong()) {
      if ($scope.playing()) PlayerFactory.pause();
      else PlayerFactory.resume();
    } else {
      PlayerFactory.start(song, $scope.album.songs);   
    }
  }

});
