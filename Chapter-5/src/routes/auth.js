const express = require('express');
const { validateRegister, validateLogin, authorizations } = require('../middlewares/auth');
const { register, login, getProfile } = require('../controllers/auth');


const router = express.Router();

router.post('/register', validateRegister, register);
router.post('/login', validateLogin, login);
router.get('/profile', authorizations(1, 2), getProfile);

module.exports = router;