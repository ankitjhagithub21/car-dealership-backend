const Car = require("../models/car")
const User = require("../models/user")
const Dealership = require("../models/dealership")
const SoldVehicle = require("../models/soldVehicle")
const Deal = require("../models/deal")

exports.getAllCars = async (req, res) => {
  try {
    const cars = await Car.find();
    res.json(cars);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Internal server error' });
  }
};

exports.getCarsInDealership = async (req, res) => {
  const { dealershipId } = req.params;
  try {
    const dealership = await Dealership.findById(dealershipId);
    if (!dealership) {
      return res.status(404).json({ message: 'Dealership not found' });
    }
    const cars = await Car.find({ _id: { $in: dealership.cars } });
    res.json(cars);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Internal server error' });
  }
};

exports.addVehicle = async (req, res) => {
  const { userId, dealershipId, carId, isSold } = req.body;
  try {
    if (userId) {
      const user = await User.findById(userId);
      user.vehicle_info.push(carId);
      await user.save();
    } else if (dealershipId) {
      const dealership = await Dealership.findById(dealershipId);
      if (!dealership) {
        return res.status(404).json({ message: 'Dealership not found' });
      }
      dealership.cars.push(carId);
      await dealership.save();
    } else {
      return res.status(400).json({ message: 'User or dealership ID is required' });
    }

    if (isSold) {
      const deal = new Deal({ car_id: carId });
      await deal.save();

      const soldVehicle = new SoldVehicle({ car_id: carId });
      await soldVehicle.save();
    }

    res.json({ message: 'Vehicle added successfully' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Internal server error' });
  }
};

exports.getDealsInDealership = async (req, res) => {
  const { dealershipId } = req.params;
  try {
    const dealership = await Dealership.findById(dealershipId);
    if (!dealership) {
      return res.status(404).json({ message: 'Dealership not found' });
    }
    const deals = await Deal.find({ _id: { $in: dealership.deals } });
    res.json(deals);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Internal server error' });
  }
};
