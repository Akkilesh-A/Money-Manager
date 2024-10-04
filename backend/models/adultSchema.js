import mongoose from "mongoose"

const adultSchema = new mongoose.Schema({
    name:{
        type: String,
        required: true,
        trim:true
    },
    email:{
        type: String,
        required: true,
        trim:true,
        unique:true
    },
    password:{
        type: String,
        required: true,
        trim:true
    },
    imgURL:{
        type:String,
        required:true,
        default:"https://res.cloudinary.com/djeplonq5/image/upload/v1719914709/file_jmjj10.png"
    },
    accountBalance:{
        type:Number,
        required:true,
        default:0
    },
    phoneNumber:{
        type:String,
        required:true,
        trim:true
    },
    tags:{
        type:[String],
        required:true,
        default:["Online","Food","Shopping","Travel","Others"]
    },
    favoriteTags:{
        type:[String],
        required:true,
        default:[]
    },
    transactions:{
        type:[mongoose.SchemaTypes.ObjectId],
        ref:"Transaction"
    }
})

const Adult=mongoose.model("Adult",adultSchema)

export {
    Adult
}