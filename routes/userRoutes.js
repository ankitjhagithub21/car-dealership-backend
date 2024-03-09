const express = require('express');
const router = express.Router();
const userController = require('../controllers/userController');
const authMiddleware = require('../middleware/authMiddleware');



// Routes
router.get('/dealerships/:carId', authMiddleware.authenticate, userController.getDealershipsWithCar);
router.get('/vehicles',authMiddleware.authenticate ,userController.getVehiclesOwnedByUser);
router.get('/deals/:carId',authMiddleware.authenticate ,userController.getDealsOnCar);

module.exports = router;
