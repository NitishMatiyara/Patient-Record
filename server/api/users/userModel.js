import mongoose from "mongoose";

// Defining Schema
const userSchema = new mongoose.Schema({
  name: { type: String, required: true, trim: true },
  email: { type: String, required: true, trim: true },
  password: { type: String, required: true, trim: true },
  verified: { type: Boolean, default: false },
  verifyToken: { type: String, required: true, trim: true }

}, {
  timestamps: true
})

// Model
const UserModel = mongoose.model("user", userSchema)

export default UserModel