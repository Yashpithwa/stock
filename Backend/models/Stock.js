import mongoose from "mongoose";

const stockSchema = new mongoose.Schema({
  symbol: String,
  date: { type: Date, unique: false },
  close: Number
}, { timestamps: true });

const Stock = mongoose.model("Stock", stockSchema);
export default Stock; 