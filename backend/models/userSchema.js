import mongoose from "mongoose"

const userSchema = new mongoose.Schema({
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
        default:"https://res.cloudinary.com/djeplonq5/image/upload/v1729526095/Avatar_edcw0g.png"
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
    tagColors:{
        type:[String],
        required:true,
        default:["bg-[#2662d9]","bg-[#2eb88a]","bg-[#e88c30]","bg-[#af57db]","bg-[#e23670]"]
    },
    favoriteTags:{
        type:[String],
        required:true,
        default:["Online","Travel"]
    },
    transactions:{
        type:[mongoose.SchemaTypes.ObjectId],
        ref:"Transaction",
        default:[]
    },
    isChild:{
        type:Boolean,
        default:false
    },
    childConnectionStatus:{
        type:Boolean,
        required:true,
        default:false
    },
    children:{
        type:[mongoose.SchemaTypes.ObjectId],
        ref:"User",
        default:[]
    },
    parentConnectionStatus:{
        type:Boolean,
        default:false
    },
    parent:{
        type:mongoose.SchemaTypes.ObjectId,
        ref:"User",
        default:null
    }
})

const User=mongoose.model("User",userSchema)

export {
    User
}