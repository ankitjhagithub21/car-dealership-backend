const Dealership = require("../models/dealership")
const Deal = require("../models/deal")

exports.addCarToDealership = async (req, res) => {
    const { carId } = req.body;
    const dealershipId = req.user.id; 
  
    try {
      const dealership = await Dealership.findById(dealershipId);
      if (!dealership) {
        return res.status(404).json({ message: 'Dealership not found' });
      }
  
      // Add carId to dealership's cars array
      dealership.cars.push(carId);
      await dealership.save();
  
      res.json({ message: 'Car added to dealership successfully' });
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: 'Internal server error' });
    }
  };
  
  exports.addDealToDealership = async (req, res) => {
    const { dealId } = req.body;
    const dealershipId = req.user.id; 
  
    try {
      const dealership = await Dealership.findById(dealershipId);
      if (!dealership) {
        return res.status(404).json({ message: 'Dealership not found' });
      }
  
    
      dealership.deals.push(dealId);
      await dealership.save();
  
      res.json({ message: 'Deal added to dealership successfully' });
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: 'Internal server error' });
    }
  };
  

exports.getSoldVehicles = async (req, res) => {
  const dealershipId = req.user.id; // Assuming dealership information is attached to request by authMiddleware
  try {
    const dealership = await Dealership.findById(dealershipId).populate('sold_vehicles');
    if (!dealership) {
      return res.status(404).json({ message: 'Dealership not found' });
    }
    res.json(dealership.sold_vehicles);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Internal server error' });
  }
};
