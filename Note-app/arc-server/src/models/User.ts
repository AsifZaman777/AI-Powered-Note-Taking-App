import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
  name: String,
  email: { type: String, required: true, unique: true },
  image: String,
}, { timestamps: true });

export const User = mongoose.model("User", userSchema);
