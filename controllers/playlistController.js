const express = require('express');
const router = express.Router();
const bcrypt = require('bcrypt');
const userDB = require('../models/userModel');
const playlistDB = require('../models/playlistModel');

router.route('/')
	  .get((req, res)=>{
	  	res.render('playlist/index', {});
	  });


module.exports = router;