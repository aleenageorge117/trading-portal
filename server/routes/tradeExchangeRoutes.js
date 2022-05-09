const express = require('express');
const controller = require('../controllers/tradeController')

const router = express.Router();

//------------------------ GET ------------------------
// get trades list --> /trades
router.get('/', controller.tradeList)

// get trade  --> /trades/:id
router.get('/:id', controller.trade)


//------------------------ PUT ------------------------
// update story with id  --> /stories/:id
router.put('/:id', controller.update)

//------------------------ POST ------------------------
// post trade --> /trade
router.post('/', controller.createTrade)

//------------------------ DELETE ------------------------
// delete trade with id  --> /trades/:id
router.delete('/:id', controller.delete)

module.exports = router;

