const express = require('express');
const controller = require('../controllers/watchlistController')
const { validateId } = require('../middleware/validator')
const { jwtCookieAuth } = require('../middleware/jwtCookieAuth');
const { isLoggedIn } = require('../middleware/auth');

const router = express.Router();

//------------------------ GET ------------------------
router.get('/:id', validateId, isLoggedIn, jwtCookieAuth, controller.getWatchList)

//------------------------ PUT ------------------------

//------------------------ POST -----------------------
router.post('/', isLoggedIn, jwtCookieAuth, controller.addToWatchList)

//------------------------ DELETE ---------------------
router.delete('/:id', validateId, isLoggedIn, jwtCookieAuth, controller.deleteFromWatchList)


module.exports = router;

