'use strict';

juke.factory('PlayerFactory', function($rootScope){
	var player = {
		start: start,
		pause: pause,
		resume: resume,
		isPlaying: isPlaying,
		getCurrentSong: getCurrentSong,
		next: next,
		previous: prev,
		getProgress: getProgress
	};

	var audio = document.createElement('audio');

	var playing = false;
	var currentSong = null;
	var progress = 0;
	var list;

	function start (song, songList){
	// stop existing audio (e.g. other song) in any case
		player.pause();
		playing = true;
	// enable loading new song
		currentSong = song;
		list = songList;
		audio.src = '/api/songs/' + song.id + '/audio';
		audio.load();
		audio.play();
	}

	function resume () {
		audio.play();
		playing = true;
	}

	function pause () {
		audio.pause();
		playing = false;
	}

	function isPlaying() {
		return playing;
	}

	function getCurrentSong() {
		return currentSong;
	}

	function mod (num, m) { return ((num % m) + m) % m; };

	function next() {
		var index = list.indexOf(currentSong);
		index = mod(index+1, list.length);
		player.start(list[index], list);
	}

	function prev() {
		var index = list.indexOf(currentSong);
		index = mod(index-1, list.length);
		player.start(list[index], list);
	}

	function getProgress() {

		return progress;
	}
	
	audio.addEventListener('loadedmetadata', function () {
		audio.addEventListener('timeupdate', function () {
			$rootScope.$digest();
	    	progress = audio.currentTime / audio.duration;
		})
	 });


	audio.addEventListener('ended', function () {
		player.next();
	});
	
	return player;

});
