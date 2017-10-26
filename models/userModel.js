const mongoose = require('mongoose');
const Playlist = require('./playlistModel');

const UserSchema = new mongoose.Schema({
	firstName: String,
	lastName: String,
	username: String,
	password: String,
	profilePic: String,
	playlists: [Playlist.schema]
});


module.exports = mongoose.model('Users', UserSchema);