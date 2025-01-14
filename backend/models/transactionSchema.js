import mongoose from "mongoose";

const transactionsSchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      default: null,
    },
    amount: {
      type: Number,
      required: true,
    },
    description: {
      type: String,
      required: true,
    },
    date: {
      type: Date,
      required: true,
    },
    tag: {
      type: String,
      required: true,
    },
    imgURL: {
      type: String,
      default: null,
    },
  },
  { timestamps: true },
);

const Transaction = mongoose.model("Transaction", transactionsSchema);

export default Transaction;
