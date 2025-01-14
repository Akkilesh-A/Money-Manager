import mongoose from "mongoose";

async function connectDB() {
  try {
    const conn = await mongoose.connect(process.env.MONGO_URI);
    console.log(`MongoDB Connected Successfully`);
  } catch (error) {
    console.error(`Error: ${error.message}`);
  }
}

export default connectDB;
