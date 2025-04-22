const Table = require('../models/Table');
const Store = require('../models/Store');

// @desc    Get tables for a store
// @route   GET /api/stores/:storeId/tables
// @access  Public
exports.getTables = async (req, res) => {
  try {
    const tables = await Table.find({ store: req.params.storeId });

    res.status(200).json({
      success: true,
      count: tables.length,
      data: tables
    });
  } catch (err) {
    res.status(500).json({ success: false, error: err.message });
  }
};

// @desc    Get single table
// @route   GET /api/tables/:id
// @access  Public
exports.getTable = async (req, res) => {
  try {
    const table = await Table.findById(req.params.id).populate({
      path: 'store',
      select: 'name description'
    });

    if (!table) {
      return res.status(404).json({ success: false, error: 'Table not found' });
    }

    res.status(200).json({ success: true, data: table });
  } catch (err) {
    res.status(500).json({ success: false, error: err.message });
  }
};

// @desc    Add table to store
// @route   POST /api/stores/:storeId/tables
// @access  Private/Owner
exports.addTable = async (req, res) => {
  try {
    req.body.store = req.params.storeId;

    const store = await Store.findById(req.params.storeId);

    if (!store) {
      return res.status(404).json({ success: false, error: 'Store not found' });
    }

    // Make sure user is store owner
    if (store.owner.toString() !== req.user.id && req.user.role !== 'admin') {
      return res.status(401).json({ 
        success: false, 
        error: 'Not authorized to add a table to this store' 
      });
    }

    const table = await Table.create(req.body);

    res.status(201).json({ success: true, data: table });
  } catch (err) {
    res.status(500).json({ success: false, error: err.message });
  }
};

// @desc    Update table
// @route   PUT /api/tables/:id
// @access  Private/Owner
exports.updateTable = async (req, res) => {
  try {
    let table = await Table.findById(req.params.id);

    if (!table) {
      return res.status(404).json({ success: false, error: 'Table not found' });
    }

    // Make sure user is store owner
    const store = await Store.findById(table.store);

    if (store.owner.toString() !== req.user.id && req.user.role !== 'admin') {
      return res.status(401).json({ 
        success: false, 
        error: 'Not authorized to update this table' 
      });
    }

    table = await Table.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true
    });

    res.status(200).json({ success: true, data: table });
  } catch (err) {
    res.status(500).json({ success: false, error: err.message });
  }
};

// @desc    Delete table
// @route   DELETE /api/tables/:id
// @access  Private/Owner
exports.deleteTable = async (req, res) => {
  try {
    const table = await Table.findById(req.params.id);

    if (!table) {
      return res.status(404).json({ success: false, error: 'Table not found' });
    }

    // Make sure user is store owner
    const store = await Store.findById(table.store);

    if (store.owner.toString() !== req.user.id && req.user.role !== 'admin') {
      return res.status(401).json({ 
        success: false, 
        error: 'Not authorized to delete this table' 
      });
    }

    await table.remove();

    res.status(200).json({ success: true, data: {} });
  } catch (err) {
    res.status(500).json({ success: false, error: err.message });
  }
};