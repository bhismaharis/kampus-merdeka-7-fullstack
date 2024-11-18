const express = require('express');
const { validateRegister, validateLogin, authorizations, validateGoogleLogin } = require('../middlewares/auth');
const { register, login, getProfile, googleLogin } = require('../controllers/auth');
const { adminRole, userRole } = require('../constants/auth');


const router = express.Router();

router.post('/register', validateRegister, register);
router.post('/login', validateLogin, login);
router.post('/google/login', validateGoogleLogin, googleLogin);
router.get('/profile', authorizations(adminRole, userRole), getProfile);

module.exports = router;