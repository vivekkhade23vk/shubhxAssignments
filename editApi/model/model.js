const mongoose = require('mongoose');

const documentSchema = new mongoose.Schema({
  title: { type: String, required: true },
  content: { type: String },
  versionHistory: [{
    version: Number,
    content: String,
    timestamp: Date,
  }],
});

const documentModel= mongoose.model('Document', documentSchema);

module.exports =documentModel

