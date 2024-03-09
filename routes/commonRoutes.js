const express = require('express');
const router = express.Router();
const commonController = require('../controllers/commonController');
const authMiddleware = require('../middleware/authMiddleware');

router.get('/cars', commonController.getAllCars);
router.get('/dealerships/:dealershipId/cars', commonController.getCarsInDealership);
router.post('/vehicles', authMiddleware.authenticate, commonController.addVehicle);
router.get('/dealerships/:dealershipId/deals', commonController.getDealsInDealership);

module.exports = router;
