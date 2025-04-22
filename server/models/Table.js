const mongoose = require('mongoose');

const TableSchema = new mongoose.Schema({
  tableNumber: {
    type: String,
    required: [true, 'Please add a table number'],
    trim: true
  },
  capacity: {
    type: Number,
    required: [true, 'Please add table capacity'],
    min: [1, 'Capacity must be at least 1']
  },
  isAvailable: {
    type: Boolean,
    default: true
  },
  store: {
    type: mongoose.Schema.ObjectId,
    ref: 'Store',
    required: true
  },
  createdAt: {
    type: Date,
    default: Date.now
  }
});

// Cascade delete bookings when a table is deleted
TableSchema.pre('remove', async function(next) {
  await this.model('Booking').deleteMany({ table: this._id });
  next();
});

module.exports = mongoose.model('Table', TableSchema);