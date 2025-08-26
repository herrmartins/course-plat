import mongoose from "mongoose";
import connectDB from "../config/mongodb";

const UserSchema = new mongoose.Schema({
  username: {
    type: String,
    required: [true, "Por favor, forneça um nome de usuário."],
    unique: true,
    trim: true,
    lowercase: true,
  },
  passwordHash: {
    type: String,
    required: [true, "Por favor, forneça uma senha."],
    minlength: 6,
  },
  email: {
    type: String,
    unique: true,
    sparse: true,
    trim: true,
    lowercase: true,
  },
  fullName: {
    type: String,
    required: [true, "Por favor, forneça seu nome completo."],
    trim: true,
  },
  dateOfBirth: {
    type: Date,
    required: [true, "Por favor, forneça sua data de nascimento."],
  },
  roles: {
    type: [String],
    enum: ["student", "parent", "teacher", "admin"],
    required: true,
    default: ["student"],
  },
  guardiansAccounts: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      default: [],
    },
  ],
  wardAccounts: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },
  ],
  createdAt: { type: Date, default: Date.now },
  modifiedAt: { type: Date, default: Date.now },
});

UserSchema.pre('save', function(next) {
  this.modifiedAt = Date.now();
  next();
});

const getUserModel = async () => {
  await connectDB();
  /*if (process.env.NODE_ENV === "development") {
    delete mongoose.connection.models["User"];
  }*/
  return mongoose.models.User || mongoose.model("User", UserSchema);
};

export { UserSchema, getUserModel };
