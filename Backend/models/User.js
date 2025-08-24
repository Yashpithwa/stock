import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
  name: String,
  email: { type: String, unique: true },
  password: String,
  googleId: String,
  resetOTP: String,
  resetOTPExpires: Date,
});

export default mongoose.model("User", userSchema);
