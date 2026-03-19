import mongoose from "mongoose";
import dotenv from "dotenv";

dotenv.config(); // load .env

const connectDB = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI, {

    });
    console.log("MongoDB connected successfully");
  } catch (error) {
    console.error("MongoDB connection Error", error);
    process.exit(1); // stop server if DB connection fails
  }
};

export default connectDB;
