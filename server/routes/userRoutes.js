const express = require('express');
const controller = require('../controllers/userController')
// const { jwtCookieAuth } = require('../middleware/jwtCookieAuth');

const router = express.Router();

//------------------------ GET ------------------------
// get user -> /user/trades
router.get('/:id', controller.jwtCookieAuth, controller.getUserTrades)

// logout  user -> /logout
router.get('/', controller.jwtCookieAuth, controller.logOut)

//------------------------ PUT ------------------------

//------------------------ POST ------------------------
// signup  user -> /signup
router.post('/signup', controller.signUp)

// login  user -> /login
router.post('/login', controller.login)

// checkSessionValid  user -> /checkSessionValid
router.post('/session', controller.jwtCookieAuth)

//------------------------ DELETE ------------------------

module.exports = router;

