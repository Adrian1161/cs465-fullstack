const express = require('express');
const router = express.Router();

// this is where we import the controllers
const tripsController = require('../controllers/trips');


router
    .route('/trips') //
    .get(tripsController.tripsList)
    .post(tripsController.tripsAddTrip); // POST Method adds a trip
    
router
    .route('/trips/:tripCode')
    .get(tripsController.tripsFindByCode)
    .put(tripsController.tripsUpdateTrip);   

module.exports = router;