import mongoose from "mongoose";
import dotenv from 'dotenv';
import { User,Transactions } from "../models/userSchema.js";
import { Admin } from "../models/adminSchema.js";
dotenv.config();

function connection(){
    mongoose.connect(process.env.DATABASE_URI)
    .then(()=>{
        console.log(`Connection with DB successful`)
    })
    .catch((err)=>{
        console.log("error",err)
    })
}

export { User,Transactions,Admin, connection } 
