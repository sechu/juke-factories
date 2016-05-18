'use strict';

juke.controller('ArtistsCtrl', function ($scope, $log, $rootScope, ArtistFactory) {
  ArtistFactory.fetchAll()
    .then(function(artists) {
      $scope.artists = artists;
      // var artistsFull = artists.map(function(album) {
      //   return AlbumFactory.fetchById(album.id);
      // });
      // return Promise.all(albumsFull);
    })
    .catch($log.error)
    // .then(function(albumsFull)  {
    //   albumsFull.forEach(function(a) { 
    //     a.imageUrl = '/api/albums/' + a.id + '/image';
    //   })
    //   $scope.albums = albumsFull;
    // })
    // .catch($log.error); // $log service can be turned on and off; also, pre-bound
    $rootScope.$on('artists', function (event, data) {
      $scope.showArtists = true;
    })
   // $scope.viewAlbum = function(album) {
   //  $rootScope.$broadcast('album', album);
   //  $scope.showAlbums = false;
   // }


})