const mongoose = require('mongoose');

const carSchema = new mongoose.Schema({
  car_id: {
    type: String,
    required: true,
    unique: true
  },
  type: {
    type: String
  },
  name: {
    type: String
  },
  model: {
    type: String
  },
  car_info: {
    type: mongoose.Schema.Types.Mixed
  }
});

module.exports = mongoose.model('Car', carSchema);
