import mongoose from "mongoose";

const FileSchema = new mongoose.Schema({
  filename: { type: String, required: true },
  mimetype: { type: String },
  url: { type: String, required: true },
  size: { type: Number },
  uploadedAt: { type: Date, default: Date.now },
  modifiedAt: { type: Date, default: Date.now },

  uploadedBy: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: false,
  },

  description: { type: String },
  version: { type: Number, default: 1 },
  thumbnailUrl: { type: String },
  checksum: { type: String },
});

FileSchema.pre("save", function (next) {
  this.modifiedAt = Date.now();
  next();
});

const File = mongoose.models.File || mongoose.model("File", FileSchema);

export default File;
