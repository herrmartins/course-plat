import mongoose from "mongoose";
import connectDB from "../config/mongodb";

const ClassTypeSchema = new mongoose.Schema({
  title: {
    type: String,
    required: [true, "Por favor, forneça um título para esse tipo de classe."],
    trim: true,
  },
  description: {
    type: String,
  },
  ageRange: {
    type: String,
  },
  price: Number,
  files: [{ type: mongoose.Schema.Types.ObjectId, ref: "File" }],
  createdAt: { type: Date, default: Date.now },
  modifiedAt: { type: Date, default: Date.now },
});

ClassTypeSchema.pre("save", function (next) {
  this.modifiedAt = Date.now();
  next();
});

const getClassTypeModel = async () => {
  await connectDB();
  if (process.env.NODE_ENV === "development") {
    delete mongoose.connection.models["ClassType"];
  }
  return (
    mongoose.models.ClassType || mongoose.model("ClassType", ClassTypeSchema)
  );
};

export { ClassTypeSchema, getClassTypeModel };
