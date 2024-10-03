import mongoose from "mongoose";
import { configDotenv } from "dotenv";

configDotenv()
const MONGO_URI=process.env.MONGO_URI;

function connectDB(){
    mongoose
    .connect(MONGO_URI)
    .then(()=>{
        console.log("Database connected successfully")
    })
    .catch((err)=>{
        console.log(err)
    })
}

export default connectDB;