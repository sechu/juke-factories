'use strict';

juke.controller('PlayerCtrl', function ($scope, PlayerFactory) {

  // initialize audio player (note this kind of DOM stuff is odd for Angular)

  // $scope.currentSong = PlayerFactory.getCurrentSong();
  // $scope.playing = PlayerFactory.isPlaying();
  $scope.prev = PlayerFactory.previous;
  $scope.next = PlayerFactory.next;
  $scope.progress = PlayerFactory.getProgress;

  $scope.currentSong = PlayerFactory.getCurrentSong;
  $scope.playing = PlayerFactory.isPlaying;

  $scope.toggle = function(song) {
    if ($scope.playing()) PlayerFactory.pause();
    else PlayerFactory.resume();
  }
  
});
