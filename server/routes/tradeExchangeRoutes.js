const express = require('express');
const controller = require('../controllers/tradeExchangeController')
const { validateId } = require('../middleware/validator')
const { jwtCookieAuth } = require('../middleware/jwtCookieAuth');
const { isLoggedIn } = require('../middleware/auth');

const router = express.Router();

//------------------------ GET ------------------------
// get trades list --> /trades
router.get('/:id', validateId, isLoggedIn, jwtCookieAuth, controller.tradeRequests)

// get trade  --> /trades/:id
// router.get('/:id', controller.trade)

//------------------------ PUT ------------------------
// update story with id  --> /stories/:id
router.put('/:id', validateId, isLoggedIn, jwtCookieAuth, controller.approveTrade)

//------------------------ POST ------------------------
// post trade --> /trade
router.post('/', isLoggedIn, jwtCookieAuth, controller.requestTrade)

//------------------------ DELETE ------------------------
// delete trade with id  --> /trades/:id
router.delete('/:id', validateId, isLoggedIn, jwtCookieAuth, controller.deleteExchange)

module.exports = router;

