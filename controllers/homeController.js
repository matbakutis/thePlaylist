const express = require('express');
const router = express.Router();
const bcrypt = require('bcrypt');

router.route('/')
	  .get((req, res)=>{
	  	const message = req.session.logged ? 'Hey you\'re logged in!' : '';
	  	res.render('index', {logged: req.session.logged, message: message, notLoggedMessage: req.session.notLoggedMessage});
	  });

router.route('/login')
	  .post((req, res)=>{
	  	req.session.username = req.body.username;
	  	req.session.logged = true;
	  	res.redirect('/');
	  });


module.exports = router;