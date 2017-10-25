const express = require('express');
const router = express.Router();
const bcrypt = require('bcrypt');
const userDB = require('../models/userModel');
const playlistDB = require('../models/playlistModel');
const search = require('youtube-search');

const opts = {
	maxResults: 25,
	key: process.env.API_KEY
};



router.route('/save/:id')
	  .post((req, res)=>{
	  	userDB.findById(req.session.userId, (err, user)=>{
	  		if (err) {
				res.send('Error finding user')
		  	}else {
		  		playlistDB.findByIdAndUpdate(req.params.id, req.body, {new: true}, (err, playlist)=>{
		  			if (err) {
		  				res.send('Error creating playlist');
		  			}else {
		  				user.playlists.id(req.params.id).remove();
		  				user.playlists.push(playlist);
		  				user.save((err, data)=>{
		  					res.send(req.params.id);
		  				});
		  			};
		  		});
		  	};
	  	});
	  })


router.route('/')
	  .get((req, res)=>{
		playlistDB.find((err, playlists)=>{
			res.render('playlist/index', {session: req.session, playlists: playlists});
		})
	  });

router.route('/new')
	  .get((req, res)=>{
	  	if (!req.session.logged) {
	  		res.redirect('/user/signup');
	  	}else {
	  		res.render('playlist/new', {session: req.session});
	  	};
	  })
	  .post((req, res)=>{
	  	userDB.findById(req.session.userId, (err, user)=>{
	  		if (err) {
				res.send('Error finding user')
		  	}else {
		  		playlistDB.create(req.body, (err, playlist)=>{
		  			if (err) {
		  				res.send('Error creating playlist');
		  			}else {
		  				user.playlists.push(playlist);
		  				user.save((err, data)=>{
		  					res.redirect('/playlists/add/' + playlist._id);
		  				});
		  			};
		  		});
		  	};
	  	});
	  })


router.route('/add/:id')
	  .get((req, res)=>{
	  	playlistDB.findById(req.params.id, (err, playlist)=>{
	  		if (err) {
	  			res.send('Error finding playlist');
	  		}else {
	  			res.render('playlist/add', {session: req.session, playlist: playlist});
	  		};
	  	});
	  })



router.route('/youtube/search/:id')
	  .get((req, res)=>{
		search(req.params.id, opts, function(err, results) {
			res.json(results);
		});
	  });

router.route('/getplaylist/:id')
	  .get((req, res)=>{
		playlistDB.findById(req.params.id, (err, playlist)=>{
	  		if (err) {
	  			res.send('Error finding playlist');
	  		}else {
	  			res.json(playlist.videoIds);
	  		};
	  	});
	  });


router.route('/:id')
	  .get((req,res)=>{
		playlistDB.findById(req.params.id, (err, playlist)=>{	
			if(err){
				res.send('Error showing playlist')
			}else{
				res.render('playlist/show', {session: req.session, playlist: playlist})
			}
		})
	})

module.exports = router;