const express = require('express');
const bcrypt = require('bcrypt-nodejs');
const cors = require('cors');
const knex = require('knex');

const register = require('./controllers/register');
const signin = require('./controllers/signin');
const profile = require('./controllers/profile');
const entries = require('./controllers/entries');

const db = knex({
	client     : 'pg',
	connection : {
		host     : '127.0.0.1',
		user     : '',
		password : '',
		database : 'smart-brain'
	}
});

db.select('*').from('users').then((data) => {});

const app = express();

app.use(express.json());
app.use(cors());

app.get('/', (req, res) => {
	res.send(database.users);
});

// Signin
app.post('/signin', (req, res) => {
	signin.handleSignin(req, res, db, bcrypt);
});

// Register
app.post('/register', (req, res) => {
	register.handleRegister(req, res, db, bcrypt);
});

// Profile
app.get('/profile/:id', (req, res) => {
	profile.handleProfile(req, res, db);
});

// Entries Count
app.put('/image', (req, res) => {
	entries.handleEntries(req, res, db);
});
app.post('/imageurl', (req, res) => {
	entries.handleApiCall(req, res);
});

app.listen(3000, () => {
	console.log('app is running on port 3000');
});
