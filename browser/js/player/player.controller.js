'use strict';

juke.controller('PlayerCtrl', function ($scope, $rootScope, PlayerFactory) {

  // initialize audio player (note this kind of DOM stuff is odd for Angular)
  var audio = document.createElement('audio');
  

  // state
  $scope.currentSong;
  $scope.playing = false;

  // incoming events (from Album or toggle)
  $scope.$on('pause', pause);
  $scope.$on('play', play);

  PlayerFactory.next(list);
  
});
