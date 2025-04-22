const express = require('express');
const {
  getBookings,
  getBooking,
  createBooking,
  updateBooking,
  deleteBooking
} = require('../controllers/bookings');

const { protect } = require('../middleware/auth');

const router = express.Router();

router.route('/')
  .get(protect, getBookings)
  .post(createBooking);

router.route('/:id')
  .get(protect, getBooking)
  .put(protect, updateBooking)
  .delete(protect, deleteBooking);

module.exports = router;