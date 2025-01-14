import mongoose from "mongoose";

const defaultTags = [
  { name: "Food", color: "#FF6B6B" }, // Coral Red
  { name: "Transport", color: "#4ECDC4" }, // Turquoise
  { name: "Shopping", color: "#45B7D1" }, // Sky Blue
  { name: "Bills", color: "#96CEB4" }, // Sage Green
  { name: "Others", color: "#FFEEAD" }, // Soft Yellow
];

const userSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
    },
    password: {
      type: String,
      required: true,
    },
    phoneNumber: {
      type: String,
      required: true,
    },
    isEmailVerified: {
      type: Boolean,
      default: false,
    },
    otp: {
      type: String,
      default: null,
    },
    otpExpiry: {
      type: Date,
      default: null,
    },
    walletBalance: {
      type: Number,
      default: 0,
    },
    monthlyBudget: {
      type: Number,
      default: 0,
    },
    tags: {
      type: [
        {
          name: {
            type: String,
            required: true,
          },
          color: {
            type: String,
            required: true,
          },
        },
      ],
      default: defaultTags,
    },
  },
  { timestamps: true },
);

const User = mongoose.model("User", userSchema);

export default User;
