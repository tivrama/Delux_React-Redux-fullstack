var mongoose = require('mongoose');

// Category Model
var CategorySchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },

  ancestors: {
    user: String,
  },
}, {
  timestamps: true,
});

// Subcategory Model
var SubcategorySchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },

  description: String,

  ancestors: {
    user: String,
    category: String,
  },
}, {
  timestamps: true,
});

// Entry Model
var EntrySchema = new mongoose.Schema({
  type: String,

  notes: {
    type: String,
    required: true,
  },

  rating: {
    type: Number,
    required: true,
  },

  ancestors: {
    user: String,
    category: String,
    subcategory: String,
  },
}, {
  timestamps: true,
});

module.exports.Category = mongoose.model('Category', CategorySchema);
module.exports.Subcategory = mongoose.model('Subcategory', SubcategorySchema);
module.exports.Entry = mongoose.model('Entry', EntrySchema);
