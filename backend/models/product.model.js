const mongoose = require('mongoose');

const productSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true
  },
  price: {
    type: Number, // ¡Correcto!
    required: true
  },
  description: {
    type: String
  },
  stock: {
    type: Number, // ¡Correcto!
    required: true
  },
  category: {
    type: String
  },
  imageUrl: {
    type: String
  }
}, {
  timestamps: true
});

module.exports = mongoose.model('Product', productSchema);