const express = require('express');
const controller = require('../controllers/userController')
const { jwtCookieAuth } = require('../middleware/jwtCookieAuth');
const { loginLimiter } = require('../middleware/rateLimiter')
const { isLoggedIn, isGuest } = require('../middleware/auth');
const { validateResult, validateLogin, validateSignUp } = require('../middleware/validator');

const router = express.Router();

//------------------------ GET ------------------------
// get user -> /user/trades
router.get('/:id', isLoggedIn, jwtCookieAuth, controller.getUserTrades)

// logout  user -> /logout
router.get('/', isLoggedIn, jwtCookieAuth, controller.logOut)

//------------------------ PUT ------------------------

//------------------------ POST ------------------------
// signup  user -> /signup
router.post('/signup', validateSignUp, validateResult, controller.signUp)

// login  user -> /login
router.post('/login', isGuest, loginLimiter, validateLogin, validateResult, controller.login)

// checkSessionValid  user -> /checkSessionValid
router.post('/session', isLoggedIn, jwtCookieAuth)

//------------------------ DELETE ------------------------

module.exports = router;

