'use strict';

juke.controller('AlbumsCtrl', function ($scope, $log, $rootScope, AlbumFactory) {
	AlbumFactory.fetchAll()
	  .then(function(albums) {
	    var albumsFull = albums.map(function(album) {
	      return AlbumFactory.fetchById(album.id);
	    });
	    return Promise.all(albumsFull);
	  })
	  .then(function(albumsFull)  {
	    albumsFull.forEach(function(a) { 
	    	a.imageUrl = '/api/albums/' + a.id + '/image';
	    })
	    $scope.albums = albumsFull;
	  })
	  .catch($log.error); // $log service can be turned on and off; also, pre-bound
	  $rootScope.$on('albums', function (event, data) {
	  	$scope.showAlbums = true;
	  })
   $scope.viewAlbum = function(album) {
   	$rootScope.$broadcast('album', album);
   	$scope.showAlbums = false;
   }


})