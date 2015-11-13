$(document).ready(function() {
	var audioObject = null;

function getArtistId(query) {
	var id = "";

	var request = {
		query: query,
		type: 'artist'
	};

	var result= $.ajax({
		url:"https://api.spotify.com/v1/search",
		data:request,
		dataType:'json',
		type:'GET',
	}).done(function(result) {
		if(result.artists.items.length===0) {
			showError("No results found for " + query);
		}else {
			id = result.artist.items[0].id;
			getTopTracks(id);
		}
	}).fail(function(){
		alert("Error getting artist");
});
	return id;
}

function getTopTracks(artistId) {
		var result = $.ajax({
			url: "https://api.spotify.com/v1/artists/" + artistId + "/top-tracks",
			data: request,
			dataType: "json",
			type: "GET"
		}).done(function(result) {
			showResults(result);
			return result;
		}).fail(function() {
			alert("Error getting tracks.");
		});
	}
