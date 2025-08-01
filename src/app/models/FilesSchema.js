import mongoose from "mongoose";
import connectDB from "@/app/config/mongodb";

const FileSchema = new mongoose.Schema({
  title: { type: String, required: true },
  mimetype: { type: String },
  url: { type: String, required: true },
  size: { type: Number },
  uploadedAt: { type: Date, default: Date.now },
  modifiedAt: { type: Date, default: Date.now },
  relatedToId: { type: mongoose.Schema.Types.ObjectId, required: false },
  relatedToType: {
    type: String,
    enum: ["Class", "ClassTypes"],
    required: false,
  },

  uploadedBy: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: false,
  },

  description: { type: String },
});

FileSchema.pre("save", function (next) {
  this.modifiedAt = Date.now();
  next();
});

const getFileModel = async () => {
  await connectDB();
  if (process.env.NODE_ENV === "development") {
    delete mongoose.connection.models["File"];
  }
  return mongoose.model("File", FileSchema);
};

export { FileSchema, getFileModel };
