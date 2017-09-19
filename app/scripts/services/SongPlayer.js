/*
* @desc Active song object from list of songs
* @type {Object}
*/

(function() {
    function SongPlayer(Fixtures) {

         var SongPlayer = {};
         var currentAlbum = Fixtures.getAlbum();
         SongPlayer.currentAlbum = null;
         var currentBuzzObject = null;
/*
* @function setSong
* @desc Stops currently playing song and loads new audio file as currentBuzzObject
* @param {Object} song
*/

         var setSong = function (song){
           if (currentBuzzObject){
             currentBuzzObject.stop();
             SongPlayer.currentSong.playing = null;
           }

/*
* @desc Buzz object audio file
* @type {Object}
*/

           currentBuzzObject = new buzz.sound(song.audioUrl, {
             formats: ['mp3'],
             preload: true
           });
           SongPlayer.currentSong = song;
         };
/*
@function stopSong
@desc stop currently playing song
@param {Object} song
*/

         var stopSong = function (song){
           currentBuzzObject.stop();
           song.playing = null;
         };

         var playSong = function(song){
           currentBuzzObject.play();
           song.playing = true;
         };

/*
@function getSongIndex
@desc Get the index of the song
@param {Object} song
*/

         var getSongIndex = function(song){
           return currentAlbum.songs.indexOf(song);
         };

/*
@desc Active song object from list of songs
@type {Object}
*/

        // SongPlayer.currentSong = null;
        // var currentBuzzObject = null;
/*
* @function play
* @desc Play current or new song
* @param {Object} song
*/

         SongPlayer.play = function(song) {
           song = song || SongPlayer.currentSong;
           if (SongPlayer.currentSong !== song) {
               setSong(song);
               playSong(song);
           } else if (SongPlayer.currentSong === song) {
              if (currentBuzzObject.isPaused()) {
                playSong(song);
           }
         }
       };

/*
* @function pause
* @desc Pause current song
* @param {Object} song
*/

       SongPlayer.pause = function(song) {
         song = song || SongPlayer.currentSong;
         currentBuzzObject.pause();
         song.playing = false;
        };

/*
@function previous
@desc Go to the previous song
@param {Object} song
*/

      SongPlayer.previous = function(song){
        var currentSongIndex = getSongIndex(SongPlayer.currentSong);
        currentSongIndex--;

        if (currentSongIndex < 0){
          // stopSong (song);
          var song = currentAlbum.songs[currentAlbum.songs.length-1];
          setSong(song);
          playSong(song);
        } else {
          var song = currentAlbum.songs[currentSongIndex];
          setSong(song);
          playSong(song);
        }
      };

/*
@function next
@desc play next song
@param {Object} song
*/

    SongPlayer.next = function (){
      var currentSongIndex = getSongIndex(SongPlayer.currentSong);
      currentSongIndex++;

      if (currentSongIndex >= currentAlbum.songs.length){
        //stopSong(song);
        var song = currentAlbum.songs[0];
        setSong(song);
        playSong(song);
      } else {
        var song = currentAlbum.songs[currentSongIndex];
        setSong(song);
        playSong(song);
      }
    };

      return SongPlayer;
    }

    angular
        .module('blocJams')
        .factory('SongPlayer', ['Fixtures', SongPlayer]);
})();
