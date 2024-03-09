const mongoose = require('mongoose');

const soldVehicleSchema = new mongoose.Schema({
  vehicle_id: {
    type: String,
    required: true,
    unique: true
  },
  car_id: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Car',
    required: true
  },
  vehicle_info: {
    type: mongoose.Schema.Types.Mixed
  }
});

module.exports = mongoose.model('SoldVehicle', soldVehicleSchema);
