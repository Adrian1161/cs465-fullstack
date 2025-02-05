const express = require('express');
const router = express.Router();

// this is where we import the controllers
const tripsController = require('../controllers/trips');


router
    .route('/trips') //
    .get(tripsController.tripsList);
    
router
    .route('/trips/:tripCode')
    .get(tripsController.tripsFindByCode);    

module.exports = router;