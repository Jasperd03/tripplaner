const mongoose = require('mongoose');

const tripSchema = new mongoose.Schema({
  name: { type: String, required: true },
  destination: String,
  startDate: Date,
  endDate: Date,
  description: String
});

module.exports = mongoose.model('Trip', tripSchema);
