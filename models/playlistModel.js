const mongoose = require('mongoose');


const PlaylistSchema = new mongoose.Schema({
	title: String,
	url: String,
	videoId: String,
	views: Number,
	type: String,
	genre: String
});


module.exports = mongoose.model('Playlists', PlaylistSchema);