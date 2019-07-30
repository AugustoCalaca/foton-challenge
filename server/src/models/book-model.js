const mongoose = require('mongoose');

const bookSchema = new mongoose.Schema({
  author: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Author',
    required: true,
  },
  title: {
    type: String,
    required: true,
    unique: true,
    trim: true,
  }
}, {
  timestamps: true,
});

bookSchema.index({ title: 'text' });

module.exports = mongoose.model('Book', bookSchema);
