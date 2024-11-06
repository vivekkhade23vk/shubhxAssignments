const mongoose=require("mongoose")

const urlSchema = new mongoose.Schema({
    originalUrl: { type: String, required: true },
    shortCode: { type: String, unique: true },
    expirationDate: { type: Date },
    createdAt: { type: Date, default: Date.now },
    clicks: { type: Number, default: 0 },
  });
  
  const urlModel = mongoose.model('Url', urlSchema);

  module.exports=urlModel;