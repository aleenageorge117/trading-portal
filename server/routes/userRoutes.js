const express = require('express');
const controller = require('../controllers/userController')
const { jwtCookieAuth } = require('../middleware/jwtCookieAuth');

const router = express.Router();

//------------------------ GET ------------------------
// get user -> /user
router.get('/', controller.getUser)

//------------------------ PUT ------------------------

//------------------------ POST ------------------------
// signup  user -> /signup
router.post('/signup', controller.signUp)

// login  user -> /login
router.post('/login', controller.login)

// checkSessionValid  user -> /checkSessionValid
// router.post('/session', jwtCookieAuth, controller.sessionIsValid)

//------------------------ DELETE ------------------------

module.exports = router;

