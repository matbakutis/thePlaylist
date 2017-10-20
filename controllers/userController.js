const express = require('express');
const router = express.Router();
const bcrypt = require('bcrypt');
const userDB = require('../models/userModel');

router.route('/signup')
	  .get((req, res)=>{
	  	res.render('user/new', {});
	  })
	  .post((req, res)=>{
	  	userDB.create({firstName: req.body.firstName, lastName: req.body.lastName, username: req.body.username}, (err, user)=>{
	  		if (err) {
	  			res.send('There was an error creating user.');
	  		}else {
	  			req.session.logged = true;
				req.session.username = user.username;
				res.redirect('/profile' + user._id);
	  		};
	  	});
	  });

	  // password encrypt
	  // , password: bcrypt.hashSync(req.body.password, bcrypt.genSaltSync(10))

router.route('/profile/:id')
	  .get((req, res)=>{
	  	userDB.findById(req.params.id, (err, user)=>{});
		  	if (err) {
		  		res.send('there was an error finding user');
		  	}else {
		  		res.render('user/porfile', {user: user});
		  	};
	  })

router.route('/login')
	  .get((req, res)=>{
	  	userDB.findOne({username: req.body.username}, (err, user)=>{
	  		if (err) {
	  			res.send('there was an error finding username');
	  		}else {
	  	// 		if (bcrypt.compareSync(req.body.password, user.password) === false) {
				// 	res.render('user/new', {message: 'Username or Password Incorrect'});
				// }else if (bcrypt.compareSync(req.body.password, user.password) === true){
				// 	req.session.logged = true;
				// 	req.session.username = user.username;
					res.redirect('/user/profile' + user._id);
				// };
	  		};
	  	});
	  });

module.exports = router;