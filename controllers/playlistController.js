const express = require('express');
const router = express.Router();
const bcrypt = require('bcrypt');
const userDB = require('../models/userModel');
const playlistDB = require('../models/playlistModel');

router.route('/')
	  .get((req, res)=>{
	  	res.render('playlist/index', {});
	  });

router.get('/new', (req,res)=>{
	res.render('playlist/new',{})
});

router.post('/',(req,res)=>{
	playlistDB.create(req.body, (err,playlist)=>{
		res.redirect('/playlists')
	})
})


module.exports = router;