const Store = require('../models/Store');
const Table = require('../models/Table');

// @desc    Get all stores
// @route   GET /api/stores
// @access  Public
exports.getStores = async (req, res) => {
  try {
    const stores = await Store.find().populate('owner', 'name email');
    res.status(200).json({ success: true, count: stores.length, data: stores });
  } catch (err) {
    res.status(500).json({ success: false, error: err.message });
  }
};

// @desc    Get single store
// @route   GET /api/stores/:id
// @access  Public
exports.getStore = async (req, res) => {
  try {
    const store = await Store.findById(req.params.id).populate('owner', 'name email');

    if (!store) {
      return res.status(404).json({ success: false, error: 'Store not found' });
    }

    res.status(200).json({ success: true, data: store });
  } catch (err) {
    res.status(500).json({ success: false, error: err.message });
  }
};

// @desc    Create new store
// @route   POST /api/stores
// @access  Private/Owner
exports.createStore = async (req, res) => {
  try {
    // Add user to req.body
    req.body.owner = req.user.id;

    // Check for existing store
    const existingStore = await Store.findOne({ owner: req.user.id });

    // If the user is not an admin, they can only add one store
    if (existingStore && req.user.role !== 'admin') {
      return res.status(400).json({ 
        success: false, 
        error: 'The user has already created a store' 
      });
    }

    const store = await Store.create(req.body);

    res.status(201).json({ success: true, data: store });
  } catch (err) {
    res.status(500).json({ success: false, error: err.message });
  }
};

// @desc    Update store
// @route   PUT /api/stores/:id
// @access  Private/Owner
exports.updateStore = async (req, res) => {
  try {
    let store = await Store.findById(req.params.id);

    if (!store) {
      return res.status(404).json({ success: false, error: 'Store not found' });
    }

    // Make sure user is store owner
    if (store.owner.toString() !== req.user.id && req.user.role !== 'admin') {
      return res.status(401).json({ 
        success: false, 
        error: 'Not authorized to update this store' 
      });
    }

    store = await Store.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true
    });

    res.status(200).json({ success: true, data: store });
  } catch (err) {
    res.status(500).json({ success: false, error: err.message });
  }
};

// @desc    Delete store
// @route   DELETE /api/stores/:id
// @access  Private/Owner
exports.deleteStore = async (req, res) => {
  try {
    const store = await Store.findById(req.params.id);

    if (!store) {
      return res.status(404).json({ success: false, error: 'Store not found' });
    }

    // Make sure user is store owner
    if (store.owner.toString() !== req.user.id && req.user.role !== 'admin') {
      return res.status(401).json({ 
        success: false, 
        error: 'Not authorized to delete this store' 
      });
    }

    await store.remove();

    res.status(200).json({ success: true, data: {} });
  } catch (err) {
    res.status(500).json({ success: false, error: err.message });
  }
};