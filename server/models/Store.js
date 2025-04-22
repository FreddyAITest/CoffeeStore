const mongoose = require('mongoose');

const StoreSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, 'Please add a store name'],
    trim: true,
    maxlength: [100, 'Store name cannot be more than 100 characters']
  },
  description: {
    type: String,
    required: [true, 'Please add a description'],
    maxlength: [500, 'Description cannot be more than 500 characters']
  },
  address: {
    type: String,
    required: [true, 'Please add an address']
  },
  phone: {
    type: String,
    required: [true, 'Please add a phone number']
  },
  email: {
    type: String,
    match: [
      /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/,
      'Please add a valid email'
    ]
  },
  operatingHours: {
    monday: {
      open: String,
      close: String,
      isClosed: {
        type: Boolean,
        default: false
      }
    },
    tuesday: {
      open: String,
      close: String,
      isClosed: {
        type: Boolean,
        default: false
      }
    },
    wednesday: {
      open: String,
      close: String,
      isClosed: {
        type: Boolean,
        default: false
      }
    },
    thursday: {
      open: String,
      close: String,
      isClosed: {
        type: Boolean,
        default: false
      }
    },
    friday: {
      open: String,
      close: String,
      isClosed: {
        type: Boolean,
        default: false
      }
    },
    saturday: {
      open: String,
      close: String,
      isClosed: {
        type: Boolean,
        default: false
      }
    },
    sunday: {
      open: String,
      close: String,
      isClosed: {
        type: Boolean,
        default: false
      }
    }
  },
  owner: {
    type: mongoose.Schema.ObjectId,
    ref: 'User',
    required: true
  },
  createdAt: {
    type: Date,
    default: Date.now
  }
});

// Cascade delete tables and bookings when a store is deleted
StoreSchema.pre('remove', async function(next) {
  await this.model('Table').deleteMany({ store: this._id });
  await this.model('Booking').deleteMany({ store: this._id });
  next();
});

module.exports = mongoose.model('Store', StoreSchema);