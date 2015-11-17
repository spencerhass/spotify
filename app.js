$(document).ready(function() {
	var audioObject = null;
	$('.submit-button').click( getArtistId );
});

function getArtistId(query) {
	var artist = $('input.artist').val(),
			artistUrl = "https://api.spotify.com/v1/search?query="+artist+"&type=artist";

	var result= $.ajax({
		url: artistUrl,
		dataType:'json',
		type:'GET',
	}).done(function(result) {
		if(result.artists.items.length===0) {
			showError("No results found for " + query);
		}else {
			id = result.artists.items[0].id;
			getTopTracks(id);
		}
	}).fail(function(){
		alert("Error getting artist");
	});
}

function getTopTracks(artistId) {
		var result = $.ajax({
			url: "https://api.spotify.com/v1/artists/" + artistId + "/top-tracks?country=US",
			dataType: "json",
			type: "GET"
		}).done(function(result) {
			showResults(result);
			return result;
		}).fail(function(result) {
			console.log( result )
			alert("Error getting tracks.");
		});
}

function showResults( results )
{
	// console.log('results');
	// console.log(results);
	var newLineItem = '';
	for (var i = 0;  i < results.tracks.length; i++)
	{
		newLineItem += '<li><img src="'+ results.tracks[i]['album']['images'][0]['url'] +'" /></li>';
		newLineItem += '<li>'+ results.tracks[i]['album']['name'] +'</li>';
		newLineItem += '<li><a href="'+ results.tracks[i]['preview_url'] +'" target="_blank">'+ results.tracks[i]['name'] +'</a></li>';
	}
	$('.results ul').append( newLineItem )


}
