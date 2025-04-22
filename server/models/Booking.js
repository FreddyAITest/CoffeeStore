const mongoose = require('mongoose');

const BookingSchema = new mongoose.Schema({
  store: {
    type: mongoose.Schema.ObjectId,
    ref: 'Store',
    required: true
  },
  table: {
    type: mongoose.Schema.ObjectId,
    ref: 'Table',
    required: true
  },
  user: {
    type: mongoose.Schema.ObjectId,
    ref: 'User'
  },
  guestName: {
    type: String,
    required: function() {
      return !this.user;
    },
    trim: true
  },
  guestEmail: {
    type: String,
    required: function() {
      return !this.user;
    },
    match: [
      /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/,
      'Please add a valid email'
    ]
  },
  guestPhone: {
    type: String,
    required: function() {
      return !this.user;
    }
  },
  partySize: {
    type: Number,
    required: [true, 'Please add party size'],
    min: [1, 'Party size must be at least 1']
  },
  date: {
    type: Date,
    required: [true, 'Please add a date']
  },
  startTime: {
    type: String,
    required: [true, 'Please add a start time']
  },
  endTime: {
    type: String,
    required: [true, 'Please add an end time']
  },
  status: {
    type: String,
    enum: ['pending', 'confirmed', 'cancelled'],
    default: 'pending'
  },
  createdAt: {
    type: Date,
    default: Date.now
  }
});

// Prevent user from submitting more than one booking for the same table at the same time
BookingSchema.index({ table: 1, date: 1, startTime: 1 }, { unique: true });

module.exports = mongoose.model('Booking', BookingSchema);