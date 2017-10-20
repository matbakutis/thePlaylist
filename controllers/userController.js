const express = require('express');
const router = express.Router();
const bcrypt = require('bcrypt');
const userDB = require('../models/userModel');

router.route('/signup')
	  .get((req, res)=>{
	  	res.render('user/new', {});
	  })
	  .post((req, res)=>{
	  	userDB.create(req.body, (err, user)=>{
	  		if (err) {
	  			res.send('There was an error creating user.');
	  		}else {
	  			console.log(user);
	  			res.redirect('/profile/' + user._id);
	  		};
	  	});
	  });

router.route('/profile/:id')
	  .get((req, res)=>{
	  	userDB.findById(req.params.id, (err, user)=>{});
	  	if (err) {
	  		res.send('there was an error finding user');
	  	}else {
	  		res.render('user/porfile', {user: user});
	  	};
	  })

module.exports = router;