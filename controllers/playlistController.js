const express = require('express');
const router = express.Router();
const bcrypt = require('bcrypt');
const userDB = require('../models/userModel');
const playlistDB = require('../models/playlistModel');

router.route('/')
	  .get((req, res)=>{
	  	playlistDB.find((err, playlists)=>{
	  		res.render('playlist/index', {playlists: playlists});
	  	})
	  	
	  });

router.get('/new', (req,res)=>{
	res.render('playlist/new',{})
});

router.post('/',(req,res)=>{
	playlistDB.create(req.body, (err,playlist)=>{
		res.redirect('/playlists')
	})
})

router.get('/:id/edit', (req, res) => {
  playlistDB.findById(req.params.id, (err, playlist) => {
        res.render('playlist/edit', {playlist: playlist})
      });
    });
                                                                                          
router.route('/:id')
  .get((req, res) => {
    playlistDB.findById(req.params.id, (err, playlist) => {
        res.render('playlist/show', {playlist: playlist })
                                                 
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

    })
module.exports = router;