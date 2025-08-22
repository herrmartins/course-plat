import mongoose from "mongoose";
import connectDB from "@/app/config/mongodb";

const DAYS = [
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thursday",
  "Friday",
  "Saturday",
  "Sunday",
];

const ScheduleSchema = new mongoose.Schema(
  {
    days: {
      type: [String],
      enum: DAYS,
      validate: {
        validator: (arr) => Array.isArray(arr) && arr.length > 0,
        message: "Selecione ao menos um dia da semana.",
      },
    },
    time: {
      type: String,
      required: [true, "Please provide a time."],
    },
  },
  { _id: false }
);

const ClassSchema = new mongoose.Schema(
  {
    classTitle: {
      type: String,
      required: [true, "Favor adicionar um título."],
    },
    classType: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "ClassType",
      required: [true, "Selecione um tipo de classe."],
      index: true,
    },
    teachers: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: [true, "Favor selecionar professor."],
        index: true,
      },
    ],
    students: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        index: true,
      },
    ],
    startDate: {
      type: Date,
      required: [true, "Please provide a start date."],
    },
    endDate: {
      type: Date,
      validate: {
        validator: function (val) {
          if (!val) return true;
          if (!this.startDate) return true;
          return val >= this.startDate;
        },
        message: "Data de término não pode ser anterior à data de início.",
      },
    },
    schedule: {
      type: ScheduleSchema,
      required: true,
    },
    files: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "File",
      },
    ],
    status: {
      type: String,
      enum: ["active", "completed", "cancelled"],
      default: "active",
      index: true,
    },
    price: {
      type: Number,
      required: true
    }
  },
  {
    timestamps: { createdAt: "createdAt", updatedAt: "modifiedAt" },
  }
);

ClassSchema.index({ classType: 1, status: 1 });
ClassSchema.index({ teacher: 1, status: 1 });

export async function getClassModel() {
  await connectDB();
  return mongoose.models.Class || mongoose.model("Class", ClassSchema);
}
