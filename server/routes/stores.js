const express = require('express');
const {
  getStores,
  getStore,
  createStore,
  updateStore,
  deleteStore
} = require('../controllers/stores');

const { protect, authorize } = require('../middleware/auth');

// Include other resource routers
const tableRouter = require('./tables');

const router = express.Router();

// Re-route into other resource routers
router.use('/:storeId/tables', tableRouter);

router.route('/')
  .get(getStores)
  .post(protect, authorize('owner', 'admin'), createStore);

router.route('/:id')
  .get(getStore)
  .put(protect, authorize('owner', 'admin'), updateStore)
  .delete(protect, authorize('owner', 'admin'), deleteStore);

module.exports = router;