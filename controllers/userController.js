const Dealership = require('../models/dealership')
const User = require('../models/user')
const Deal = require('../models/deal')

exports.getDealershipsWithCar = async (req, res) => {
  const { carId } = req.params;
  try {
    const dealerships = await Dealership.find({ cars: carId });
    res.json(dealerships);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Internal server error' });
  }
};

exports.getVehiclesOwnedByUser = async (req, res) => {
  const userId = req.user.id; 
  try {
    const user = await User.findById(userId).populate('vehicles');
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }
    res.json(user.vehicles);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Internal server error' });
  }
};

exports.getDealsOnCar = async (req, res) => {
  const { carId } = req.params;
  try {
    const deals = await Deal.find({ car_id: carId });
    res.json(deals);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Internal server error' });
  }
};
