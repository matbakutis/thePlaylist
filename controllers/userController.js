const express = require('express');
const router = express.Router();
const bcrypt = require('bcrypt');
const userDB = require('../models/userModel');

router.route('/signup')
	  .get((req, res)=>{
	  	res.render('user/new', {session: req.session});
	  })
	  .post((req, res)=>{
	  	userDB.findOne({username: req.body.username}, (err, user)=>{
	  		if (err) {
	  			res.send('There was an error finding user.');
	  		}else {
	  			if (user) {
	  				req.session.messageCreate = "Username Taken";
	  				res.redirect('/user/signup');
	  			}else {
	  				userDB.create({firstName: req.body.firstName, lastName: req.body.lastName, username: req.body.username, profilePic: req.body.profilePic}, (err, user)=>{
				  		if (err) {
				  			res.send('There was an error creating user.');
				  		}else {
				  			req.session.logged = true;
							req.session.username = user.username;
							req.session.userId = user._id;
							req.session.message = "";
					 		req.session.messageCreate = "";
					 		req.session.messageLogIn = "";
							res.redirect('/user/profile/' + user._id);
				  		};
				  	});
	  			};
	  		};
	  	});
	  });

	  // password encrypt
	  // , password: bcrypt.hashSync(req.body.password, bcrypt.genSaltSync(10))

router.route('/profile/')
	  .get((req, res)=>{
	  	if (req.session.logged) {
	  		res.redirect('/user/profile/' + req.session.userId);
	  	}else {
	  		res.redirect('/user/signup');
	  	};
	  })

router.route('/profile/:id')
	  .get((req, res)=>{
	  	userDB.findById(req.params.id, (err, user)=>{
		  	if (err) {
		  		res.send('there was an error finding user');
		  	}else {
		  		res.render('user/profile', {session: req.session, user: user});
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
					// 	req.session.messageLogIn = 'Username or Password Incorrect';
					//  res.redirect('/user/signup');
					// }else if (bcrypt.compareSync(req.body.password, user.password) === true){
						req.session.logged = true;
						req.session.username = user.username;
						req.session.userId = user._id;
					 	req.session.message = "";
					 	req.session.messageCreate = "";
					 	req.session.messageLogIn = "";
						res.redirect('/user/profile/' + user._id);
					// };
		  		};
		  	}else {
		  		req.session.messageLogIn = 'Username or Password Incorrect';
				res.redirect('/user/signup');
			};
	  	});
	  });

router.route('/signout')
	  .get((req, res)=>{
	  	req.session.destroy();
	  	res.redirect('/');
	  })



module.exports = router;