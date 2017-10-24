$('#searchButton').click((e)=>{
	e.preventDefault();
	const searchText = $('#searchText').val();
	$('#results').empty();
	ajaxCall(searchText);
});

const ajaxCall = (searchText) => {
	$.ajax({
		url: "http://localhost:3000/playlists/youtube/search/" + searchText,
		type: 'GET',
		dataType: 'Json',
		success: (res) => {
			const resultsArray = [];
			for (let i = 0; i < res.length; i++) {
				if (res[i].kind === "youtube#video") {
					resultsArray.push(res[i]);
				};
			};
			for (let i = 0; i < resultsArray.length; i++) {
				const theDiv = $('<div class="result">');
				theDiv.append($('<img class="thumbnail" src="' + resultsArray[i].thumbnails.medium.url + '">'));
				const wordDiv = $('<div class="resultText">');
				wordDiv.append($('<h4>' + resultsArray[i].title + '</h3>'));
				wordDiv.append($('<h6>' + resultsArray[i].channelTitle + '</h5>'));
				$('#results').append(theDiv.append(wordDiv));
			};
		},
		error: (err) => {
			console.log(err);
		}
	});
};