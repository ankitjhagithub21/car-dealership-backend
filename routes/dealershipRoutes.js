const express = require('express');
const router = express.Router();
const dealershipController = require('../controllers/dealershipController');
const authMiddleware = require('../middleware/authMiddleware');



// Routes
router.post('/add-car',authMiddleware.authenticate ,dealershipController.addCarToDealership);
router.post('/add-deal',authMiddleware.authenticate ,dealershipController.addDealToDealership);
router.get('/sold-vehicles',authMiddleware.authenticate ,dealershipController.getSoldVehicles);

module.exports = router;
