'use strict';

juke.controller('AlbumCtrl', function ($scope, $log, $rootScope, StatsFactory, AlbumFactory, PlayerFactory) {

  // AlbumFactory.fetchAll()
  // .then(function(albums) {
  //   var albumsFull = albums.map(function(album) {
  //     return AlbumFactory.fetchById(album.id);
  //   });
  //   return Promise.all(albumsFull);
  // })
  // .then(function(albumsFull) {
  //   return $scope.albums = albumsFull;
  // })
  $rootScope.$on('album', function(event, data) {
    var album = data
    album.songs.forEach(function (song, i) {
      song.audioUrl = '/api/songs/' + song.id + '/audio';
      song.albumIndex = i;
    })
    $scope.album = album;
    $scope.showAlbum = true;
  })

  $rootScope.$on('albums', function () {
    $scope.showAlbum = false;
  });
    


    // StatsFactory.totalTime(album)
    // .then(function(time) {
    //    album.totalTime = Math.round(time/60)+"min";
    // })    
   // $log service can be turned on and off; also, pre-bound

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
