'use strict';

juke.controller('SidebarCtrl', function ($scope, $log, $rootScope) {
  $scope.viewAlbums = function () {
    $rootScope.$broadcast('albums');
  }

  $scope.viewAllArtists = function () {
    $rootScope.$broadcast('artists');
  }
  
});