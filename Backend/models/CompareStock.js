import mongoose from "mongoose";

const compareStockSchema = new mongoose.Schema({
  symbol: { type: String, required: true },
  date: { type: Date, required: true },
  open: { type: Number, required: true },
  high: { type: Number, required: true },
  low: { type: Number, required: true },
  close: { type: Number, required: true },
  volume: { type: Number, required: true }
});

// prevent duplicate entries per symbol/date
compareStockSchema.index({ symbol: 1, date: 1 }, { unique: true });

const CompareStock = mongoose.model("CompareStock", compareStockSchema);

export default CompareStock;
