import mongoose, { connect } from "mongoose";
import dotenv from "dotenv";

dotenv.config();

let connected = false;

const connectDB = async () => {
  mongoose.set('strictQuery', true);

  try {
    await mongoose.connect(process.env.MONGODB_URI)
    connected = true;
  } catch (error) {
    throw error
  }
};

export default connectDB;