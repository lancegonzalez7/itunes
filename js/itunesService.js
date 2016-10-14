angular.module('itunes').service('itunesService', function($http, $q) {
    //This service is what will do the 'heavy lifting' and get our data from the iTunes API.
    //Also note that we're using a 'service' and not a 'factory' so all your methods you want to call in your controller need to be on 'this'.

    //Write a method that accepts an artist's name as the parameter, then makes a 'JSONP' http request to a url that looks like this
    //https://itunes.apple.com/search?term=' + artist + '&callback=JSON_CALLBACK'
    //Note that in the above line, artist is the parameter being passed in.
    //You can return the http request or you can make your own promise in order to manipulate the data before you resolve it.

    //Code here
    this.getItunesInfo = function(searchName,propertyName) {
        var deferred = $q.defer();
        $http.jsonp('https:itunes.apple.com/search?term=' + searchName + '&callback=JSON_CALLBACK').then(function(response) {
            var newSongData = [];
            var parsedResponse = response.data.results;
            for (var i = 0; i < parsedResponse.length; i++) {
                if (parsedResponse[i][propertyName] == searchName) {
                    newSongData.push({
                        AlbumArt: parsedResponse[i].artworkUrl100,
                        Artist: parsedResponse[i].artistName,
                        Title: parsedResponse[i].trackName,
                        Collection: parsedResponse[i].collectionName,
                        CollectionPrice: parsedResponse[i].collectionPrice,
                        Play: parsedResponse[i].previewUrl,
                        Type: parsedResponse[i].kind
                    })
                }
            }

            deferred.resolve(newSongData);
        })
        return deferred.promise;
    }
});

/*
  AlbumArt: "http://a3.mzstatic.com/us/r30/Features4/v4/22/be/30/22be305b-d988-4525-453c-7203af1dc5a3/dj.srlprmuo.100x100-75.jpg"
  Artist: "Nelly"
  Collection: "Nellyville"
  CollectionPrice: 11.99
  Play: "http://a423.phobos.apple.com/us/r1000/013/Music4/v4/4a/ab/7c/4aab7ce2-9a72-aa07-ac6b-2011b86b0042/mzaf_6553745548541009508.plus.aac.p.m4a"
  Type: "song"
*/

// // {
//     "wrapperType": "track",
//     "kind": "song",
//     "artistId": 78500,
//     "collectionId": 122726,
//     "trackId": 122701,
//     "artistName": "U2",
//     "collectionName": "All That You Can't Leave Behind",
//     "trackName": "Beautiful Day",
//     "collectionCensoredName": "All That You Can't Leave Behind",
//     "trackCensoredName": "Beautiful Day",
//     "artistViewUrl": "https://itunes.apple.com/us/artist/u2/id78500?uo=4",
//     "collectionViewUrl": "https://itunes.apple.com/us/album/beautiful-day/id122726?i=122701&uo=4",
//     "trackViewUrl": "https://itunes.apple.com/us/album/beautiful-day/id122726?i=122701&uo=4",
//     "previewUrl": "http://a1856.phobos.apple.com/us/r1000/105/Music/38/30/97/mzm.akzgiqgo.aac.p.m4a",
//     "artworkUrl30": "http://is5.mzstatic.com/image/thumb/Music/v4/4e/cc/72/4ecc72d6-2257-baaf-163c-a4dfd08015ba/source/30x30bb.jpg",
//     "artworkUrl60": "http://is5.mzstatic.com/image/thumb/Music/v4/4e/cc/72/4ecc72d6-2257-baaf-163c-a4dfd08015ba/source/60x60bb.jpg",
//     "artworkUrl100": "http://is5.mzstatic.com/image/thumb/Music/v4/4e/cc/72/4ecc72d6-2257-baaf-163c-a4dfd08015ba/source/100x100bb.jpg",
//     "collectionPrice": 9.99,
//     "trackPrice": 1.29,
//     "releaseDate": "2000-10-09T07:00:00Z",
//     "collectionExplicitness": "notExplicit",
//     "trackExplicitness": "notExplicit",
//     "discCount": 1,
//     "discNumber": 1,
//     "trackCount": 11,
//     "trackNumber": 1,
//     "trackTimeMillis": 248067,
//     "country": "USA",
//     "currency": "USD",
//     "primaryGenreName": "Rock",
//     "isStreamable": true
// }
