require('dotenv').config();
require('./db/db');
const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const methodOverride = require('method-override');
const homeController = require('./controllers/homeController');
const userController = require('./controllers/userController');
const playlistController = require('./controllers/playlistController');
const session = require('express-session');
const parseurl = require('parseurl');

app.set('views', __dirname + '/views');
app.set('view engine', 'ejs');
app.use(bodyParser.urlencoded({limit: '50mb', extended: false}));
app.use(methodOverride('_method'));
app.use('/', express.static('public'));
app.use(session({
	secret: 'shhhhh its a secret',
	resave: false,
	saveUnitialized: false
}));
app.use( function( req, res, next ) {
	if ( req.query._method === 'DELETE' ) {
		req.method = 'DELETE';
		req.url = req.path;
	}
	next(); 
});
app.use(function (req, res, next) {
	if (req.method === 'DELETE'){
		if (req.session.logged === true) {
			next();
		}else {
			req.session.notLoggedMessage = "you have to log in";
			res.redirect('/');
		};
	}else {
		next();
	}
});


app.use('/playlists', playlistController);
app.use('/user', userController);
app.use('/', homeController);

const port = process.env.PORT || 3000;

app.listen(port, ()=>{
	console.log("listening");
});