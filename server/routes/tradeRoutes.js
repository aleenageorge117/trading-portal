const express = require('express');
const controller = require('../controllers/tradeController')
const { validateId } = require('../middleware/validator')
const { jwtCookieAuth } = require('../middleware/jwtCookieAuth');
const { isLoggedIn } = require('../middleware/auth');
const { validateResult, validateTrade } = require('../middleware/validator');

const router = express.Router();

//------------------------ GET ------------------------
// get trades list --> /trades
router.get('/', controller.tradeList)

// get trade  --> /trades/:id
router.get('/:id', validateId, controller.trade)


//------------------------ PUT ------------------------
// update story with id  --> /stories/:id
router.put('/:id', validateId,  isLoggedIn, jwtCookieAuth, validateTrade, validateResult, controller.update)

//------------------------ POST ------------------------
// post trade --> /trade
router.post('/', isLoggedIn, jwtCookieAuth, validateTrade, validateResult, controller.createTrade)

//------------------------ DELETE ------------------------
// delete trade with id  --> /trades/:id
router.delete('/:id', validateId, isLoggedIn, jwtCookieAuth, controller.delete)

module.exports = router;

