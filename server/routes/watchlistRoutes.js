const express = require('express');
const controller = require('../controllers/watchlistController')

const router = express.Router();

//------------------------ GET ------------------------
router.get('/:id', controller.getWatchList)

//------------------------ PUT ------------------------

//------------------------ POST -----------------------
router.post('/', controller.addToWatchList)

//------------------------ DELETE ---------------------
router.delete('/:id', controller.deleteFromWatchList)


module.exports = router;

