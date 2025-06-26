import mongoose from "mongoose";
import connectDB from "../config/mongodb";

const User = new mongoose.Schema({
  username: { type: String, unique: true },
  passwordHash: String,
  email: { type: String, unique: true },
  fullName: { type: String },
  dateOfBirth: { type: Date },
  role: { type: String, enum: ["parent", "student"], required: true },
  parentIds: [{ type: mongoose.Schema.Types.ObjectId, ref: "User" }],
  canLogin: { type: Boolean, default: false },
  createdAt: { type: Date, default: Date.now },
  modifiedAt: { type: Date, default: Date.now },
});

const getUserModel = async () => {
  await connectDB();
  if (process.env.NODE_ENV === "development") {
    delete mongoose.connection.models["User"];
  }
  return mongoose.models.User || mongoose.model("User", User);
};

export { User, getUserModel };
