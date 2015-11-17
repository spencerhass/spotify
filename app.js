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
	console.log('results');
	console.log(results);
	var newLineItem = '',
			spotifyBaseUrl = 'https://embed.spotify.com/?uri=';
	for (var i = 0;  i < results.tracks.length; i++)
	{
		newLineItem += '<div class="result">'
		newLineItem += '<div class="play-button">'
		newLineItem += 	'<iframe src="'+spotifyBaseUrl+results.tracks[i]['uri']+'" width="100" height="100" frameborder="0" allowtransparency="true"></iframe>'
		newLineItem += '</div>'
    newLineItem += '<div class="content">'
    newLineItem +=   '<a class="artist" target="_blank" href="'+results.tracks[i]['artists'][0]['external_urls']['spotify']+'">'+results.tracks[i]['artists'][0]['name']+'</a><br>'
    newLineItem +=   results.tracks[i]['album']['name']
    newLineItem += '</div>'
    //newLineItem += '<div class="cover"><img src="'+results.tracks[i]['album']['images'][0]['url']+'" /></div>'
    newLineItem += '</div>'
	}
	$('.results').append( newLineItem )


}
