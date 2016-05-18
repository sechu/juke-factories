'use strict';

juke.factory('ArtistFactory', function($http, $log) {
  var artistObj = {};
  artistObj.fetchAll = function() {
    return $http.get('/api/artists/')
      .then(function (res) { return res.data; })
      .catch($log.error);
  };
  // albumObj.fetchById = function(id) {
  //   return $http.get('/api/albums/' + id)
  //     .then(function (res) { return res.data; })
  //     .catch($log.error);
  // };

  return artistObj;
});