import mongoose from "mongoose";

const userSchema = new mongoose.Schema(
  {
    name: { type: String, required: true, trim: true },
    email: { type: String, required: true, lowercase: true, unique: true },
    password: { type: String, required: true },
    emailVerified: { type: Boolean, default: false },
    avatar: { type: String, default: "" },
    resetToken: { type: String, default: null },
    resetTokenExpiry: { type: Date, default: null },
    phone: { type: Number, default: null },
    country: { type: String, default: null },
    displayName: { type: String, default: null }, 
  },
  { timestamps: true },
);

const User = mongoose.model("User", userSchema);
export default User;

