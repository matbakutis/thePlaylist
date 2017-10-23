const express = require('express');
const router = express.Router();
const bcrypt = require('bcrypt');
const userDB = require('../models/userModel');
const playlistDB = require('../models/playlistModel');

const search = require('youtube-search');
 
const opts = {
  maxResults: 25,
  key: process.env.API_KEY};
 


router.route('/')
      .get((req, res)=>{
	  	  playlistDB.find((err, playlists)=>{
          res.render('playlist/index', {session: req.session, playlists: playlists});
	  	})
	  	
	  });

router.route('/add')
      .get((req, res)=>{
        res.render('playlist/add', {session: req.session});
      });

router.get('/new', (req,res)=>{
	res.render('playlist/new',{session: req.session})
});

router.post('/',(req,res)=>{
	playlistDB.create(req.body, (err,playlist)=>{
		res.redirect('/playlists')
	})
})

router.get('/:id/edit', (req, res) => {
  playlistDB.findById(req.params.id, (err, playlist) => {
        res.render('playlist/edit', {session: req.session, playlist: playlist})
      });
    });
                                                                                          
router.route('/:id')
  .get((req, res) => {
    playlistDB.findById(req.params.id, (err, playlist) => {
        res.render('playlist/show', {session: req.session, playlist: playlist})
                                                 
      })
    })
 
  .delete((req, res) => {
    // if(req.session.logged === true){

     playlistDB.findByIdAndRemove(req.params.id, (err, deletedPlaylist) => {
        // req.params.id gives us the articles id
                res.redirect('/playlists')
          })
    // } else {
    //   // req.session.notLoggedMessage = 'Hey You gotta log in to delete an article, idiot';
    //   res.redirect('/')
    // // }

    })

  .put((req, res) => {
   // if(req.session.logged === true){

     playlistDB.findByIdAndUpdate(req.params.id, (err, updatedPlaylist) => {
        // req.params.id gives us the articles id
                res.redirect('/playlists')
          })
    // } else {
    //   req.session.notLoggedMessage = 'Hey You gotta log in to delete an article, idiot';
    //   res.redirect('/')
    // }

    });



router.route('/youtube/search/:id')
      .get((req, res)=>{
          search(req.params.id, opts, function(err, results) {
            res.json(results);
          });
      });

module.exports = router;