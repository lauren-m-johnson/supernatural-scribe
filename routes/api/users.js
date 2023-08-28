const express = require('express');
const router = express.Router();
const usersCtrl = require('../../controllers/api/users');
const ensureLoggedIn = require('../../config/ensureLoggedIn');

// POST route to create a new user
router.post('/', usersCtrl.create);

// POST route to log in a user
router.post('/login', usersCtrl.login);

// GET route to check the authentication token validity
router.get('/check-token', ensureLoggedIn, usersCtrl.checkToken);

module.exports = router;