const Booking = require('../models/Booking');
const Table = require('../models/Table');
const Store = require('../models/Store');

// @desc    Get all bookings
// @route   GET /api/bookings
// @access  Private
exports.getBookings = async (req, res) => {
  try {
    let query;

    // If user is not admin or owner, they can only see their bookings
    if (req.user.role === 'user') {
      query = Booking.find({ user: req.user.id });
    } else if (req.user.role === 'owner') {
      // Find stores owned by this user
      const stores = await Store.find({ owner: req.user.id });
      const storeIds = stores.map(store => store._id);
      
      // Find bookings for these stores
      query = Booking.find({ store: { $in: storeIds } });
    } else {
      // Admin can see all bookings
      query = Booking.find();
    }

    // Add populate
    query = query.populate({
      path: 'store',
      select: 'name description'
    }).populate({
      path: 'table',
      select: 'tableNumber capacity'
    }).populate({
      path: 'user',
      select: 'name email'
    });

    const bookings = await query;

    res.status(200).json({
      success: true,
      count: bookings.length,
      data: bookings
    });
  } catch (err) {
    res.status(500).json({ success: false, error: err.message });
  }
};

// @desc    Get single booking
// @route   GET /api/bookings/:id
// @access  Private
exports.getBooking = async (req, res) => {
  try {
    const booking = await Booking.findById(req.params.id)
      .populate({
        path: 'store',
        select: 'name description'
      })
      .populate({
        path: 'table',
        select: 'tableNumber capacity'
      })
      .populate({
        path: 'user',
        select: 'name email'
      });

    if (!booking) {
      return res.status(404).json({ success: false, error: 'Booking not found' });
    }

    // Make sure user is booking owner or store owner or admin
    if (
      (booking.user && booking.user._id.toString() !== req.user.id) && 
      req.user.role !== 'admin'
    ) {
      // Check if user is the store owner
      const store = await Store.findById(booking.store);
      if (store.owner.toString() !== req.user.id) {
        return res.status(401).json({ 
          success: false, 
          error: 'Not authorized to access this booking' 
        });
      }
    }

    res.status(200).json({ success: true, data: booking });
  } catch (err) {
    res.status(500).json({ success: false, error: err.message });
  }
};

// @desc    Create new booking
// @route   POST /api/bookings
// @access  Public
exports.createBooking = async (req, res) => {
  try {
    // Check if table exists
    const table = await Table.findById(req.body.table);

    if (!table) {
      return res.status(404).json({ success: false, error: 'Table not found' });
    }

    // Check if table is available
    if (!table.isAvailable) {
      return res.status(400).json({ success: false, error: 'Table is not available' });
    }

    // Check if store exists
    const store = await Store.findById(req.body.store);

    if (!store) {
      return res.status(404).json({ success: false, error: 'Store not found' });
    }

    // Check if table belongs to store
    if (table.store.toString() !== store._id.toString()) {
      return res.status(400).json({ 
        success: false, 
        error: 'Table does not belong to this store' 
      });
    }

    // Check if there's already a booking for this table at this time
    const existingBooking = await Booking.findOne({
      table: req.body.table,
      date: req.body.date,
      startTime: req.body.startTime,
      status: { $ne: 'cancelled' }
    });

    if (existingBooking) {
      return res.status(400).json({ 
        success: false, 
        error: 'This table is already booked at this time' 
      });
    }

    // If user is logged in, add user to booking
    if (req.user) {
      req.body.user = req.user.id;
    }

    const booking = await Booking.create(req.body);

    res.status(201).json({ success: true, data: booking });
  } catch (err) {
    res.status(500).json({ success: false, error: err.message });
  }
};

// @desc    Update booking
// @route   PUT /api/bookings/:id
// @access  Private
exports.updateBooking = async (req, res) => {
  try {
    let booking = await Booking.findById(req.params.id);

    if (!booking) {
      return res.status(404).json({ success: false, error: 'Booking not found' });
    }

    // Make sure user is booking owner or store owner or admin
    if (
      (booking.user && booking.user.toString() !== req.user.id) && 
      req.user.role !== 'admin'
    ) {
      // Check if user is the store owner
      const store = await Store.findById(booking.store);
      if (store.owner.toString() !== req.user.id) {
        return res.status(401).json({ 
          success: false, 
          error: 'Not authorized to update this booking' 
        });
      }
    }

    booking = await Booking.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true
    });

    res.status(200).json({ success: true, data: booking });
  } catch (err) {
    res.status(500).json({ success: false, error: err.message });
  }
};

// @desc    Delete booking
// @route   DELETE /api/bookings/:id
// @access  Private
exports.deleteBooking = async (req, res) => {
  try {
    const booking = await Booking.findById(req.params.id);

    if (!booking) {
      return res.status(404).json({ success: false, error: 'Booking not found' });
    }

    // Make sure user is booking owner or store owner or admin
    if (
      (booking.user && booking.user.toString() !== req.user.id) && 
      req.user.role !== 'admin'
    ) {
      // Check if user is the store owner
      const store = await Store.findById(booking.store);
      if (store.owner.toString() !== req.user.id) {
        return res.status(401).json({ 
          success: false, 
          error: 'Not authorized to delete this booking' 
        });
      }
    }

    await booking.remove();

    res.status(200).json({ success: true, data: {} });
  } catch (err) {
    res.status(500).json({ success: false, error: err.message });
  }
};