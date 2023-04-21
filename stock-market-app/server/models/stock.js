const mongoose = require('mongoose');

const StockSchema = new mongoose.Schema({
  stock_name: {
    type: String,
    required: true,
  },
  next_close: {
    type: Number,
    required: true,
  },
  next_pct_change: {
    type: Number,
    required: true,
  },
  // You can add other fields you need from the prediction results.
});

module.exports = mongoose.model('Stock', StockSchema);

