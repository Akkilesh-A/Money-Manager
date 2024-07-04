import mongoose from "mongoose";

const adminSchema = new mongoose.Schema({
    email:{
        type : String,
        required:true
    },
    name:{
        type:String,
        required:true
    },
    password:{
        type : String,
        required:true
    },
    imgURL : {
        type: String,
        default : "https://res.cloudinary.com/djeplonq5/image/upload/c_crop,ar_1:1/v1719914709/file_jmjj10.png"
    },
    userConnectionStatus :{
        type : Boolean,
        default : false
    },
    userId:{
        type : mongoose.Schema.Types.ObjectId,
        ref : 'User',
        default: null
    },
})
const Admin=mongoose.model('Admin',adminSchema)

export { Admin }