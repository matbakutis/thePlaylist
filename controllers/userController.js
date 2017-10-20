const express = require('express');
const router = express.Router();
const bcrypt = require('bcrypt');
const userDB = require('../models/userModel');

router.route('/signup')
	  .get((req, res)=>{
	  	res.render('user/new', {});
	  })
	  .post((req, res)=>{
	  	userDB.create({firstName: req.body.firstName, lastName: req.body.lastName, username: req.body.username, profilePic: req.body.profilePic}, (err, user)=>{
	  		if (err) {
	  			res.send('There was an error creating user.');
	  		}else {
	  			req.session.logged = true;
				req.session.username = user.username;
				console.log(user.profilePic.length)
				res.redirect('/user/profile/' + user._id);
	  		};
	  	});
	  });

	  // password encrypt
	  // , password: bcrypt.hashSync(req.body.password, bcrypt.genSaltSync(10))

router.route('/profile/:id')
	  .get((req, res)=>{
	  	userDB.findById(req.params.id, (err, user)=>{
		  	if (err) {
		  		res.send('there was an error finding user');
		  	}else {
		  		res.render('user/profile', {user: user});
		  	};
	  	});
	  })

router.route('/login')
	  .post((req, res)=>{
	  	userDB.findOne({username: req.body.username}, (err, user)=>{
	  		if (user) {
		  		if (err) {
		  			res.send('there was an error finding username');
		  		}else {
		  	// 		if (bcrypt.compareSync(req.body.password, user.password) === false) {
					// 	req.session.message = 'Username or Password Incorrect';
					//  res.redirect('/user/signup');
					// }else if (bcrypt.compareSync(req.body.password, user.password) === true){
					// 	req.session.logged = true;
					// 	req.session.username = user.username;
					//  req.session.message = "";
						res.redirect('/user/profile/' + user._id);
					// };
		  		};
		  	}else {
		  		req.session.message = 'Username or Password Incorrect';
				res.redirect('/user/signup');
			};
	  	});
	  });



module.exports = router;