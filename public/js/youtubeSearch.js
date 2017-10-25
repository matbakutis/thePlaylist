jQuery.ajaxSettings.traditional = true;

$('#searchButton').click((e)=>{
	e.preventDefault();
	const searchText = $('#searchText').val();
	$('#results').empty();
	ajaxSearchCall(searchText);
});

const ajaxSearchCall = (searchText) => {
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
				const wordDiv = $('<div class="resultText" title="' + resultsArray[i].title + ' -|- ' + resultsArray[i].channelTitle +'">');
				wordDiv.append($('<h6>' + resultsArray[i].title + '</h6>'));
				wordDiv.append($('<p>' + resultsArray[i].channelTitle + '</p>'));
				theDiv.data(resultsArray[i]);
				$('#results').append(theDiv.append(wordDiv));
			};
		},
		error: (err) => {
			console.log(err);
		}
	});
};

const ajaxSaveCall = (id, object) => {
	$.ajax({
		url: "/playlists/save/" + id,
		type: 'POST',
		data: object,
		success: (res) => {
			console.log('success');
		},
		error: (err) => {
			console.log(err);
		}
	});
};


$('.resultsAndVideos').sortable({
	connectWith: '.resultsAndVideos',
	helper: 'clone',
	zIndex: 10000 
});


$('#saveButton').click((e)=>{
	e.preventDefault();
	const dataObject = {
		title: $('#title').text(),
		videoIds: []
	};
	$('#videos').children().each(function(){
		dataObject.videoIds.push($(this).data().id)
	});
	ajaxSaveCall($('#title').attr('data-id'), dataObject);
});





















