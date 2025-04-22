const express = require('express');
const {
  getTables,
  getTable,
  addTable,
  updateTable,
  deleteTable
} = require('../controllers/tables');

const { protect, authorize } = require('../middleware/auth');

const router = express.Router({ mergeParams: true });

router.route('/')
  .get(getTables)
  .post(protect, authorize('owner', 'admin'), addTable);

router.route('/:id')
  .get(getTable)
  .put(protect, authorize('owner', 'admin'), updateTable)
  .delete(protect, authorize('owner', 'admin'), deleteTable);

module.exports = router;