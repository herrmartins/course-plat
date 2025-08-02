import mongoose from "mongoose";
import connectDB from "@/app/config/mongodb";

const ClassSchema = new mongoose.Schema({
  classType: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "ClassType",
    required: [true, "Selecione um tipo de classe."],
  },
  teacher: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: [true, "Favor selecionar professor."],
  },
  students: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
  }],
  startDate: {
    type: Date,
    required: [true, "Please provide a start date."],
  },
  endDate: {
    type: Date,
  },
  schedule: {
    days: [{
      type: String,
      enum: ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"],
    }],
    time: {
      type: String,
      required: [true, "Please provide a time."],
    },
  },
  files: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: "File",
  }],
  status: {
    type: String,
    enum: ["active", "completed", "cancelled"],
    default: "active",
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
  modifiedAt: {
    type: Date,
    default: Date.now,
  },
});

ClassSchema.pre("save", function (next) {
  this.modifiedAt = Date.now();
  next();
});

const getClassModel = async () => {
  await connectDB();
  if (process.env.NODE_ENV === "development") {
    delete mongoose.connection.models["Class"];
  }
  return mongoose.models.Class || mongoose.model("Class", ClassSchema);
};

export { ClassSchema, getClassModel };